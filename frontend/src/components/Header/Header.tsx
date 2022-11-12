import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../../images/user.png";
import logo from "../../images/logo.png"
import "./Header.scss";

import 'react-toastify/dist/ReactToastify.css';
import LoginRegisterModal from "../Modal/LoginRegisterModal";
import { useAppDispatch } from "../../store/store"
import { logout } from "../../redux/authSlice";
import { searchMovies } from "../../redux/movieSlice";

import { searcheActors } from "../../redux/actorSlice";


function Header() {
  const dispatch = useAppDispatch();
  const userData = localStorage.getItem("user")
  const user = JSON.parse(userData!)
  const [fullName, setFullName] = useState("")
  const [permissions, setPermissions] = useState("")

  useEffect(() =>{
    if(user){
      setFullName(user.fullName)
      setPermissions(user.permissions)
    }

  },[user])
 

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [errorInput, setErrorInput] = useState("")
  const [term, setTerm] = useState("")


  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }
  const onBackdropClick = () => {
    setIsModalVisible(false)

  }
  const onClear = () => {
    setErrorInput("")
  }

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  const handleSearch = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    if(term ===""){
      alert("Please enter search value")
    }
    dispatch(searchMovies(term))
    dispatch(searcheActors(term))
    
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

        <form onSubmit={handleSearch}>
          <input type="text" value={term} placeholder="Search" onChange={(e) => setTerm(e.target.value)} />
          <button type="submit"> <i className="fa fa-search"></i> </button>
        </form>


      </div>
      <div className="user">
        <div className="userDetails">
          <div className="userimage">
            <img src={userIcon} alt="user" />
          </div>
          <>
            {permissions === "user" && (
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
            {user === null &&
              <>

                <div className="text-white name">Hi Guest!</div>
                <button className="btn btn-secondary" onClick={toggleModal} >Login</button>
              </>

            }

          </>

        </div>
      </div>
    
      <LoginRegisterModal
        onClear={onClear}
        onClose={onBackdropClick}
        isModalVisible={isModalVisible}
      />
    </div>
  );
}

export default Header;
