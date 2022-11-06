import React, { useState, useMemo, useEffect } from "react";
import "./MovieDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getMovie, getMovieActors } from "../../redux/movieSlice";
import { getUsers } from "../../redux/userSlice";
import { RootState } from "../../store/store"

import ActorCard from "../ActorCard/ActorCard";
import { Actor, MovieDetails, Review } from "../../interfaces/index";
import { getReviews } from "../../redux/reviewSlice";

function MovieDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();


  const data = useAppSelector((state: RootState) => state.movies.movie)
  const moviesState = useAppSelector((state: RootState) => state.movies)
  // const actors = useAppSelector((state: RootState) => state.movies.movie?.actors)
  // const reviews = useAppSelector((state: RootState) => state.movies.movie?.reviews)
  const users = useAppSelector((state: RootState) => state.users.users)


  useEffect(() => {
    if (id) {
      dispatch(getMovie(id))
    }
  }, [id, dispatch])
  const movie = useMemo(() => data, [data])
  let reviews = useMemo(() => movie?.reviews, [id])

  console.log(reviews)

  let ratings: number[] = [];

  reviews?.map((review) => {
    ratings.push(review.rating)
  })


  let aveRatings = 0;
  if (ratings.length) {
    aveRatings = ratings?.reduce((total, current) => total + current) / ratings.length
    console.log(aveRatings);

  }

  let renderActors

  renderActors = movie?.actors?.map((movie, index) => (<ActorCard key={index} {...movie} />))

  let renderReviews

  renderReviews = movie?.reviews?.map((review, index) => (
   

    <div key={index} className="reviewDiv">
          <span className="reviewRating">{review.rating}</span>
          <p className="reviewDesc"> {review.description} </p>
          <p className="userDetail">Anonymous </p>

    </div>

  ))




  return (
    <>
      <div className="movie-section">
        {moviesState.loading === true ? (
          <div>...Loading</div>
        ) : (
          <>
            <div className="section-left">
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
              <img src={movie?.imageURL} alt={movie?.title} />

              <div className="review-container">

                <h1 className="mt-5"> User Reviews</h1>
                {renderReviews}

               


              </div>

            </div>
            <div className="section-right">

              <div className="movie-info">

                <h2>Top Cast</h2>


              </div>

              <div className="actor-container">
                {renderActors}
              </div>

            </div>

          </>
        )}
      </div>



    </>

  );
}

export default MovieDetail;
