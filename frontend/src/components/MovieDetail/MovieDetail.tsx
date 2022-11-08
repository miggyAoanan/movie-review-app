import React, { useState, useMemo, useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getMovie } from "../../redux/movieSlice";
import { RootState } from "../../store/store"
import ActorCard from "../ActorCard/ActorCard";
import { Rating } from 'react-simple-star-rating'

import { Review } from '../../interfaces/review'
import { addMovieReview, AddReviewArgs } from '../../redux/reviewSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MovieDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.movies.movie)
  const moviesState = useAppSelector((state: RootState) => state.movies)
  // const users = useAppSelector((state: RootState) => state.users.users)
  const [userRating, setUserRating] = useState(0)
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id))
    }
  }, [id, dispatch])
  const movie = useMemo(() => data, [data])
  let reviews = useMemo(() => movie?.reviews, [id])
  let movieName = movie?.title

  console.log(reviews)

  let ratings: number[] = [];

  reviews?.map((review: Review) => {
    ratings.push(review.rating)
  })

  let aveRatings = 0;
  if (ratings.length) {
    aveRatings = ratings?.reduce((total, current) => total + current) / ratings.length
    console.log(aveRatings);

  }

  let renderActors

  renderActors = movie?.actors?.map((movie, index) => (<ActorCard key={index} {...movie} />))

  let renderActorsList

  renderActorsList = movie?.actors?.map((movie, index) => (

    <ul className="actorList">
      <li key={index}> {movie.firstName} &nbsp; {movie.lastName}</li>

    </ul>
  ))

  let filteredReviews

  filteredReviews = movie?.reviews?.filter((review) => review.isActive != false)

  let renderReviews

  renderReviews = filteredReviews?.map((review, index) => (


    <div key={index} className="reviewDiv">
      <span className="reviewRating">

        <i className="fa fa-star"></i> : {review.rating}<span>/5</span>
      </span>

      <p className="reviewDesc"> {review.description} </p>
      <p className="userDetail">{review.userName} </p>

    </div>

  ))

  const handleRating = (rate: number) => {
    setUserRating(rate)

  }


  const handleChangetextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }
  const onSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user")!)
    const userPermission = user.permissions;
    const userId = user.id;
    const userName = user.fullName;
    const movieId = id;
    const reviewData: AddReviewArgs = { description, rating: userRating, movieId, movieName, userId, userName }
    console.log(userRating)

    if (userPermission === "user") {
      if (userRating === 0) {
        toast.error("Please add a rating")
      } else if (description === "") {
        toast.error("Please add review details")
      } else {
        dispatch(addMovieReview(reviewData)).then((res) => {

          toast.warning("Review awaiting for moderation")
        })

      }

    }else{
      toast.error("Admin cannot add a review")
    }

  }

  return (
    <>
      <div className="movie-section">
        {moviesState.loading === true ? (
          <div>...Loading</div>
        ) : (
          <>
            <div className="section-left">
              <div className="topSectionLeft">
                <div className="movie-title">{movie?.title}</div>
                <div className="movie-rating mb-5">
                  <span>
                    IMDB Rating <i className="fa fa-star"></i> : {aveRatings}
                  </span>
                  <span>
                    Cost <i className="fa-light fa-sack-dollar"></i> : {movie?.cost}
                  </span>

                  <span>
                    Year <i className="fa fa-calendar"></i> : {movie?.year}
                  </span>
                </div>
              </div>
              <div className="imageSection">
                <img src={movie?.imageURL} alt={movie?.title} className="movieImage" />
              </div>




            </div>
            <div className="section-right">
              <div className="movie-info">
                <h2 className="mt-5"> Overview</h2>
                <p>This is the overview</p>

                <div className="actorListContainer">

                  {renderActorsList}
                </div>
              </div>

              <div className="review-container">

                <h2 className="mt-5"> User Reviews</h2>
                {renderReviews}

              </div>


              <div className="formreviewContainer">
                <div className="starRatingDiv mb-2">

                  <Rating
                    onClick={handleRating}

                  />
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text">Add a review</span>
                  <textarea className="form-control" aria-label="Add a review" onChange={handleChangetextArea}></textarea>
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-secondary btn-sm" type="button"
                    onClick={onSubmit}
                  >Save</button>
                </div>


              </div>



            </div>

          </>
        )}
      </div>

      <div className="actorContainer mb-2">
        <h2 className="text-white mt-4 mb-2">Cast</h2>
        <div className="actor-container mb-4">

          {renderActors}
        </div>

      </div>
      <ToastContainer />
    </>

  );
}

export default MovieDetail;
