import React, { useCallback, useEffect, useMemo } from "react";
import Slider from 'react-slick'
import { useSelector } from "react-redux";
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

  const movies = useMemo(() => dataMovies, [dataMovies])

  let renderMovies

  renderMovies =
    movies ?
      movies?.map((movie, index) => (<MovieCard key={index} {...movie} />)) :
      (
        <div className="movies-error">
          <h3>{moviesState.errors}</h3>
        </div>
      );


  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>

        <div className="movie-container"><Slider {...Settings}>{renderMovies}</Slider></div>
      </div>

    </div>
  )
}

export default MovieList