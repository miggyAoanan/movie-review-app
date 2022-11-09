import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Home from "./pages/home/Home";

import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import MovieDashboard from "./pages/admin/MovieDashboard";
import ActorDashboard from "./pages/admin/ActorDashboard";
import UserDashBoard from "./pages/admin/UserDashBoard";
import { useAppDispatch, useAppSelector } from "./store/store";
import { selectAuth, setUser } from './redux/authSlice'
import ReviewDashboard from "./pages/admin/ReviewDashboard";
import Actorlist from "./components/Actor/ActorList";
import ActorMovieList from "./components/Actor/ActorMovieList";
import MovieList from "./components/MovieList/MovieList";
import Protected from "./pages/Protected";



function App() {

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail/>} />
            <Route path="/actor" element={<Actorlist />} />
            <Route path="/actor/:id" element={<ActorMovieList />} />
            <Route path="/" element={<Protected />}>
                <Route path="/admin/movie/dash" element={<MovieDashboard />} />
                <Route path="/admin/actor/dash" element={<ActorDashboard />} />
                <Route path="/admin/user/dash" element={<UserDashBoard />} />
                <Route path="/admin/review/dash" element={<ReviewDashboard />} />  
            </Route>   
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
