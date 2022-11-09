import React, { useEffect } from "react";
import Slider from 'react-slick'

import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.scss";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store'
import { getMovies, movieDetails } from "../../redux/movieSlice";
import { Settings } from "../../common/settings";

const MovieList = () => {

  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state: RootState) => state.movies)
  const dataMovies = useAppSelector(movieDetails)

  useEffect(() => {
    if (dataMovies) {
      dispatch(getMovies())
    }
  }, [dispatch])



  let renderMovies

  renderMovies =
  dataMovies ?
  dataMovies?.map((movie, index) => (<MovieCard key={index} {...movie} />)) :
      (
        <div className="movies-error">
          <h3>{moviesState.errors}</h3>
        </div>
      );


  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2 className="text-white">Movies</h2>
        <div className="movie-container"><Slider {...Settings}>{renderMovies}</Slider></div>
      </div>

    </div>
  )
}

export default MovieList