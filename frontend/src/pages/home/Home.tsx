import React from "react";
import "./home.scss";
import MovieList from "../../components/MovieList/MovieList";


const Home = () => {
  return (
    <div >
      <div className="banner-img"></div>
      <MovieList />
    </div>
  );
};

export default Home;