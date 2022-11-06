import React, { useState, useCallback, useEffect } from "react";
import "./MovieDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getMovie, getMovieActors } from "../../redux/movieSlice";
import { RootState } from "../../store/store"

import ActorCard from "../ActorCard/ActorCard";
import { Actor, Review } from "../../interfaces/index";

function MovieDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {

    const initGetMovies = async () => {
      await dispatch(getMovie(id))
      await dispatch(getMovieActors(id))
    }

    initGetMovies()

  }, [])

  const movie = useAppSelector((state: RootState) => state.movies.movie)
  const moviesState = useAppSelector((state: RootState) => state.movies)
  const actors = useAppSelector((state: RootState) => state.movies.movie?.actors)
  const reviews = useAppSelector((state: RootState) => state.movies.movie?.reviews)
  // const [userRating, setUserRating] = useState(0)
  let ratings: number[] = [];

  reviews?.map((review) => {
    ratings.push(review.rating)
  })


  let aveRatings = 0;
  if (ratings.length) {
    aveRatings = ratings?.reduce((total, current) => total + current) / ratings.length
    // setUserRating(aveRatings)
   
  }
  // console.log(userRating);

  let renderActors

  renderActors =
    moviesState.getMovieStatus == "fullfilled" ?

      actors?.map((movie, index) => (<ActorCard key={index} {...movie} />)) :

      (
        <div className="movies-error">
          <h3>{moviesState.errors}</h3>
        </div>
      );

    let actorList =
    moviesState.getMovieStatus == "fullfilled" ?
    actors?.map((actor, index) => (
        <ul key={index} className="actorList">
          <li>{actor.firstName} &nbsp; {actor.lastName}</li>


        </ul>


    )) : ""

  return (
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
            
          </div>
          <div className="section-right">

            <div className="movie-info">

              <h2>Top Cast</h2>
               
               {/* <div className="actorlist">
               {actorList}

               </div> */}

            </div>

            <div className="actor-container">
            {renderActors}
            </div>

          </div>

        
        </>
      )}
    </div>
  );
}

export default MovieDetail;
