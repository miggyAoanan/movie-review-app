import React, { useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.scss";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { getMovies, movieDetails } from "../../redux/movieSlice";

import { Movie } from "../../interfaces";

const MovieList = () => {

  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state: RootState) => state.movies)
  const movies  = useAppSelector(movieDetails)

  useEffect(() => {
    if (movies) {
      dispatch(getMovies())
    }
  }, [dispatch])



  let renderMovies
  movies?
  renderMovies  =  movies?.map((movie:Movie, index:number) => (<MovieCard key={index} {...movie} />)) :
      (
        <div className="movies-error">
          <h3>{moviesState.errors}</h3>
        </div>
      );


  return (
    <div className="main-movie-wrapper">
      <div className="main-movie-list">
        <h2 className="text-white">Movies</h2>
        <div className="main-movie-container">{renderMovies}</div>
       
      </div>

    </div>
  )
}

export default MovieList