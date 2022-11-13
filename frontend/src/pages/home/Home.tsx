import React, {useEffect} from "react";
import "./home.scss";
import MovieList from "../../components/MovieList/MovieList";

import { useAppDispatch} from '../../store/store'
import { searchMovies , getMovies} from "../../redux/movieSlice";
import { getActors, searcheActors } from "../../redux/actorSlice";
import Actorlist from "../../components/Actor/ActorList";

const Home = () => {

  const dispatch = useAppDispatch()
  const movieText = "";
  const actortext = "" 


  useEffect(() => {
    if(movieText || actortext){
      dispatch(searchMovies(movieText))
      dispatch(searcheActors(actortext))
    }else{
      dispatch(getMovies())
      dispatch(getActors())
    }
  
  }, [dispatch])
  
  return (
    <div >
      
    
      <MovieList  />
      <Actorlist />

    </div>
  );
};

export default Home;