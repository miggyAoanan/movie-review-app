import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import LoginModal, { LoginFunction } from "../Modal/LoginModal";

import { useAppDispatch, useAppSelector } from "../../store/store"
import { logout, selectAuth, setUser } from "../../redux/authSlice";
import { useLoginUserMutation } from '../../authServices/authApi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //this is for the curent login user
  const { fullName, permissions } = useAppSelector(selectAuth)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [errorInput, setErrorInput] = useState("")

  const [loginUser,
    { data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError }
  ] = useLoginUserMutation()

  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }
  const onBackdropClick = () => {
    setIsModalVisible(false)
  }

  const onLoginRequest: LoginFunction = async ({ email, password }) => {

    // eslint-disable-next-line
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (email === "") {
      setErrorInput("Email is required")
    } else if (password === "") {
      setErrorInput("Password is required")
    } else if (password.length <= 8) {
      setErrorInput("Must be at least 8 character")
    } else if (!emailReg.test(email)) {
      setErrorInput("Must be a valid email format")
    }
    else {
      await loginUser({ email, password }).then((res: any) => {
        if (res.data) {
          console.log(res)
        }
        else {
          console.log(res)
          console.log(res.error.data.error.message);// if thre is a single error
          let errorMessage = res.error.data.error.message
          let errorName = res.error.data.error.name
          let error = errorName + ": " + errorMessage
          setErrorInput(error)
          let errorArray: any = []
          let errors: any = res.error.data.error.details
          errors.forEach((err: any) => {

            errorArray.push(err.message)
          })
          console.log(errorArray)

        }
      })

    }
  }
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("login successfull")
      dispatch(setUser({ fullName: loginData.data.fullName, token: loginData.data.token, permissions: loginData.data.permissions, isActive: loginData.data.isActive}))
      console.log(isLoginSuccess)
    }

  }, [isLoginSuccess])

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  return (
    <div className="header mb-5">

      <div className="linkContainer">
      <Link to="/">
          <div className="logo">Movie App</div>
        </Link>
      </div>
      <div className="user">
        <div className="userDetails">
          <div className="userimage">
            <img src={user} alt="user" />
          </div>
          {
            fullName ?
              <>
                <div className="text-white name">Hi {fullName} !</div>


                <div className="dropdown">
                  <Link className="btn btn-secondary dropdown-toggle" to="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </Link>

                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {permissions === "admin" ? (
                      <>
                        <Link to="/admin/movie/dash"><span className="dropdown-item" >Movies</span></Link>
                        <Link to="/admin/actor/dash"><span className="dropdown-item" >Actors</span></Link>
                        <Link to="/admin/review/dash"><span className="dropdown-item" >Reviews</span></Link>
                        <Link to="/admin/user/dash"><span className="dropdown-item" >Users</span></Link>  
                        <Link to="/"><span className="dropdown-item" onClick={() => handleLogout()} >Logout</span></Link>

                      </>

                    ) : (
                      
                        <Link to="/"><span className="dropdown-item" onClick={() => handleLogout()} >Logout</span></Link>
                    )}             
                  </ul>
                </div>
              </>
              :
              <>
                <div className="text-white name">Hi Guest!</div>
                <button className="btn btn-secondary" onClick={toggleModal} >Login</button>
             </>
          }
        </div>
      </div>
      <ToastContainer />
      <LoginModal

        loginErrorInput={errorInput}
        onClose={onBackdropClick}
        onLoginRequested={onLoginRequest}
        isModalVisible={isModalVisible}
      />
    </div>
  );
}

export default Header;
