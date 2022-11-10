import React, {useEffect} from "react";
import "./home.scss";
import MovieList from "../../components/MovieList/MovieList";

import { useAppDispatch} from '../../store/store'
import { movieDetails, searchMovies , getMovies} from "../../redux/movieSlice";
import { searcheActors } from "../../redux/actorSlice";
import Actorlist from "../../components/Actor/ActorList";
import HomeDetails from "./HomeDetails";



const Home = () => {

  const dispatch = useAppDispatch()
  const movieText =  "avengers";
  const actortext = "chris"
  useEffect(() => {
    dispatch(searchMovies(movieText))
    dispatch(searcheActors(actortext))
    
  
  }, [dispatch])
  
  return (
    <div >
      <div className="banner-img"></div>
      <HomeDetails />
      {/* <MovieList />
      <Actorlist /> */}

    </div>
  );
};

export default Home;