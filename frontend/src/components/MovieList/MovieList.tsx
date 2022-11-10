import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.scss";
import { useAppSelector, RootState} from '../../store/store'
import { movieDetails } from "../../redux/movieSlice";
import { Movie } from "../../interfaces";

const MovieList = () => {
  const moviesState = useAppSelector((state: RootState) => state.movies)
  const movies = useAppSelector(movieDetails)

  let renderMovies
  movies?.length !== 0 ?
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