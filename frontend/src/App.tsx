import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Home from "./pages/home/Home";

import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import MovieDashboard from "./pages/admin/MovieDashboard";
import ActorDashboard from "./pages/admin/ActorDashboard";
import { useAppDispatch, useAppSelector } from "./store/store";
import {selectAuth} from './redux/authSlice'
import { setUser } from "./redux/authSlice";

function App() {


  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const {permissions} = useAppSelector(selectAuth)
  useEffect(() =>{
    dispatch(setUser(user))
  }, [])

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            {permissions === "admin" ? 
            
            <>
            <Route path="/admin/movie/dash" element={<MovieDashboard />} />
            <Route path="/admin/actor/dash" element={<ActorDashboard />} />
            </>
            : 
            (

              <Route path="/" element={<Navigate to='/' replace />} />
             
            )
           
            // <Navigate to="/" />
            
          }
            
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
