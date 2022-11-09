import React, { useMemo, useEffect } from "react";
import './ActorMovie.scss'
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, RootState } from '../../store/store';
import { getMovies} from "../../redux/movieSlice";
import { getActor } from "../../redux/actorSlice";
import MovieCard from "../MovieCard/MovieCard";


function ActorMovieList() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movies = useAppSelector( (state:RootState) => state.movies.movies)
  const actorDetails = useAppSelector( (state:RootState) => state.actors.actor)
 
  useEffect(() => {
    if (id) {
      dispatch(getMovies())
      dispatch(getActor(id))
    }
  }, [id, dispatch])
  const movieDetails = useMemo(() => movies, [movies])
  const actorData = useMemo(() => actorDetails, [actorDetails])
 let filteredMovies = movieDetails?.filter(details => details?.actors?.some(actor => actor.id === id))
 let renderMovies
  renderMovies =
  filteredMovies?.length != 0 ?
 ( filteredMovies?.map((movie, index) =>( <MovieCard key={index} {...movie}/>)))
  :
    ( <h2>"No Movie casted by this Actor"</h2>)
  
  return (
    <div className="actor-movie-wrapper">
    <div className="actor-movie-list mb-4">
        <div className="actorContainer">
            <img src={actorData?.imageURL}  alt={actorData?.firstName}/>
            <h2 className="mt-2 text-white">{actorData?.firstName}&nbsp;{actorData?.lastName}</h2>
            <p className="text-white">{actorData?.age}</p>
            <p className="text-white">{actorData?.gender}</p>

        </div>
      
    
      <div className="actor-movie-container mb-2">{renderMovies}</div>
    </div>
    
  </div>
  )
  
}

export default ActorMovieList;
