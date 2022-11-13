import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.scss";
import { useAppSelector } from '../../store/store'
import { movieDetails } from "../../redux/movieSlice";
import { Movie } from "../../interfaces";

const MovieList = () => {

  const movies = useAppSelector(movieDetails)
  return (
    <div className="main-movie-wrapper">
      <div className="main-movie-list">
        <h2 className="text-white">Movies</h2>
        <div className="main-movie-container">

          {movies && movies.length > 0 ? (
            movies?.map((movie: Movie, index: number) => (<MovieCard key={index} {...movie} />))
          )
            : <div className="movies-error">
              <h3>No Movie found</h3>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MovieList