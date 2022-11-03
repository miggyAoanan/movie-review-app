import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import LoginModal, {LoginFunction} from "../Modal/LoginModal";
import {login} from "../../redux/userSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"


function Header() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.users)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState("")

  const toggleModal = () => {
    setIsModalVisible(wasModalVisible =>  !wasModalVisible)
  }

  const onBackdropClick = () => {
    setIsModalVisible(false)
  }

  const onLoginRequest : LoginFunction = async({email, password}) => {
    const userData = { email, password }; 


    if (email === "") {
      setError("Email is required");
    } else if (password === "") {
      setError("Password is required");
    } else {
      dispatch(login(userData)).then((res) =>{
        
      })
      setError("")
    }

  }

  return (
    <div className="header mb-5">
      
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>

      <Link to="/register">
        <div >Register</div>
      </Link>

      <Link to="/login">
        <div >Login</div>
      </Link>

      <Link to="/admin/movie/dash">
        <div >Admin Movie List</div>
      </Link>

      <div className="user-image">
        <img src={user} alt="user" />
      </div>

      <button className="btn btn-secondary" onClick={toggleModal} >Test modal</button>

      

       <LoginModal 
       loginError={error}
       onClose={onBackdropClick}
       onLoginRequested={onLoginRequest}
       isModalVisible={isModalVisible}
       />
     
      
    </div>
  );
}

export default Header;
