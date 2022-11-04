import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Home from "./pages/home/Home";

import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import MovieDashboard from "./pages/admin/MovieDashboard";
import { useAppDispatch } from "./store/store";
import { setUser } from "./redux/authSlice";





function App() {

  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
            <Route path="/admin/movie/dash" element={<MovieDashboard />} />



          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
