import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import logo from "../../images/logo.png"
import "./Header.scss";
import LoginRegisterModal, { LoginFunction } from "../Modal/LoginRegisterModal";

import { useAppDispatch, useAppSelector } from "../../store/store"
import { logout, selectAuth, setUser } from "../../redux/authSlice";
import { useLoginUserMutation } from '../../authServices/authApi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Header() {
  const dispatch = useAppDispatch();
  const { fullName, permissions } = useAppSelector(selectAuth)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState("")
  const [loginUser,
    { data: loginData,
      isSuccess: isLoginSuccess }
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
      setError("Email is required")
    } else if (password === "") {
      setError("Password is required")
    } else if (password.length <= 8) {
      setError("Must be at least 8 character")
    } else if (!emailReg.test(email)) {
      setError("Must be a valid email format")
    }
    else {
      await loginUser({ email, password }).then((res: any) => {
        if (res.data) {
          console.log(res)
        }
        else {


          let errorMessage = res.error.data.error.message
          let errorName = res.error.data.error.name
          let error = errorName + ": " + errorMessage
          setError(error)
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
      dispatch(setUser({
        fullName: loginData.data.fullName,
        token: loginData.data.token,
        permissions: loginData.data.permissions,
        isActive: loginData.data.isActive,
        id: loginData.data.id
      }))

      onBackdropClick()
    }

  }, [isLoginSuccess])

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  const [term, setTerm] = useState("")

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    console.log(term)
  }




  return (
    <div className="header mb-5">
      <div className="linkContainer">
        <Link to="/">
          <div className="logoDiv">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </Link>
        <Link to="/movie">
          <div className="">Movies</div>
        </Link>

        <Link to="/actor">
          <div className="">Actors</div>
        </Link>
      </div>

      <div className="search-bar">

        <form onSubmit={handleSubmit}>
          <input type="text" value={term} placeholder="Search for movies" onChange={(e) => setTerm(e.target.value)} />
          <button type="submit"> <i className="fa fa-search"></i> </button>
        </form>


      </div>
      <div className="user">
        <div className="userDetails">
          <div className="userimage">
            <img src={user} alt="user" />
          </div>
          <>
            {permissions === "user" &&  (
            <>
            <div className="text-white name"> Hi {fullName} !</div>
            <button className="btn btn-secondary" onClick={() => handleLogout()}  >Logout</button>
            </>
            )}

            {permissions === "admin" &&
              <>
              <div className="text-white name"> Hi {fullName} !</div>
              <div className="dropdown">
                <Link className="btn btn-secondary dropdown-toggle" to="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </Link>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                  <>
                    <Link to="/admin/movie/dash"><span className="dropdown-item" >Movies</span></Link>
                    <Link to="/admin/actor/dash"><span className="dropdown-item" >Actors</span></Link>
                    <Link to="/admin/review/dash"><span className="dropdown-item" >Reviews</span></Link>
                    <Link to="/admin/user/dash"><span className="dropdown-item" >Users</span></Link>
                    <Link to="/"><span className="dropdown-item" onClick={() => handleLogout()} >Logout</span></Link>
                  </>

                </ul>
              </div>
              </>
            }

          </>

          <> 
          {!fullName &&
          <>
          
          <div className="text-white name">Hi Guest!</div>
          <button className="btn btn-secondary" onClick={toggleModal} >Login</button>      
          </>   
          
          }
           
          </>

        </div>
      </div>
      <ToastContainer />
      <LoginRegisterModal

        onClose={onBackdropClick}
        onLoginRequested={onLoginRequest}
        isModalVisible={isModalVisible}
      />
    </div>
  );
}

export default Header;
