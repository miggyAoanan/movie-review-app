import React, { useCallback, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.scss";

import {useAppDispatch, useAppSelector, RootState} from '../../store/store'
import { getMovies } from "../../redux/movieSlice";

const MovieList = () => {
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    await dispatch(getMovies());
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  const movies = useAppSelector( (state:RootState) => state.movies.movies)
  const moviesState = useAppSelector( (state:RootState) => state.movies)
  
 let renderMovies

  renderMovies =
  moviesState.getMovieStatus =="fullfilled"?
  movies?.map((movie, index) =>( <MovieCard key={index} {...movie}/>)) :
  (
    <div className="movies-error">
      <h3>{moviesState.errors}</h3>
    </div>
  );
  
  return (
    <div className="movie-wrapper">
    <div className="movie-list">
      <h2>Movies</h2>
      {/* <div className="movie-container"><MovieCard link={link}/></div> */}
      <div className="movie-container">{renderMovies}</div>
    </div>
    <div className="show-list">
      <h2>Shows</h2>
      {/* <div className="movie-container"><MovieCard link={link}/></div> */}
    </div>
  </div>
  )
}

export default MovieList