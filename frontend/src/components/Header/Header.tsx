import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import LoginModal, { LoginFunction } from "../Modal/LoginModal";

import { useAppDispatch, useAppSelector } from "../../store/store"
import { logout, selectAuth, setUser } from "../../redux/authSlice";
import { useLoginUserMutation } from '../../authServices/authApi'

function Header() {
  const dispatch = useAppDispatch();

  //this is for the curent login user
  const { fullName, permissions } = useAppSelector(selectAuth)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState("")

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
    const userData = { email, password };
    if (email && password) {
      await loginUser({ email, password })
    }

  }

  useEffect(() => {
    if (isLoginSuccess) {
      // <Alert severity="success">Login Success</Alert>
      alert("login successfull");
      console.log(loginData);

      dispatch(setUser({ fullName: loginData.data.fullName, token: loginData.data.token, permissions: loginData.data.permissions }))
      console.log(isLoginSuccess)
    }

  }, [isLoginSuccess])

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  return (
    <div className="header mb-5">

      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      {permissions === "admin" ?
        <>
          <Link to="/admin/movie/dash">
            <div > Movies</div>
          </Link>

          <Link to="/admin/actor/dash">
            <div >Actors</div>
          </Link>
        </>


        :
        ""
      }

      <div className="user">
        {
          fullName ?
            <>
              <div className="text-white name">Hi {fullName} !</div>
              <button
                onClick={() => handleLogout()}
              >Logout</button>
            </>
            :
            <>
              <div className="text-white name">Hi Guest!</div>
              <button className="btn btn-secondary" onClick={toggleModal} >Login</button>
              <LoginModal
                loginError={error}
                onClose={onBackdropClick}
                onLoginRequested={onLoginRequest}
                isModalVisible={isModalVisible}
              />
            </>
        }
        <div className="user-image">
          <img src={user} alt="user" />
        </div>
      </div>
    </div>
  );
}

export default Header;
