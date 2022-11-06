import React, { useCallback, useEffect } from "react";
import "./home.scss";
import MovieList from "../../components/MovieList/MovieList";
import { Link, useLocation } from "react-router-dom";

const Home = () => {

  const location = useLocation()

  useEffect(() =>{
   const loc=  window.location.pathname
    console.log(loc)
    console.log(location);
  },[])
  
  return (
    <div >
      <div className="banner-img"></div>
      <MovieList />
    </div>
  );
};

export default Home;