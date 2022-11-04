import React, { useState, useCallback, useEffect } from "react";
import './register.scss'

import { registerUser } from "../../redux/userSlice"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import { Alert } from "@mui/material";
import { styled } from '@mui/material/styles'
import { Navigate } from "react-router-dom";

const CustomAlert = styled(Alert)({

}) as typeof Alert

const Register = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: RootState) => state.users)
  const [redirect, setRedirect] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",

  });

  const { fullName, email, password, password2 } = input;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    // eslint-disable-next-line
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (fullName === "") {
      alert("fullName is required");
    } else if (email === "") {
      alert("Email is required");
    } else if (password === "") {
      alert("Password is required");
    } else if (password2 === "") {
      alert("Confirm password is required");
    } else if (password !== password2) {
      alert("Passwords do not match");
    } else {
      if (!emailReg.test(email)) {
        alert("Please enter a valid email");
      } else {
        const userData = { fullName, email, password };

        dispatch(registerUser(userData))
        setRedirect(true);
      }
    }
  }
  return (
    <div className="wrapper mt100">
      <h2 className="mb50">Register</h2>
      <div className="formContainer mb50">
        <form className="form">
          <div className="formGroup right50">
            <label htmlFor="fullName" className="formlabel">Full Name</label>
            <input
              type="text"
              placeholder="Ann Hunter"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={input.fullName}
            />
          </div>

          <div className="formGroup right50">
            <label htmlFor="email" className="formlabel">Email</label>
            <input
              type="text"
              placeholder="ann.hunter@email.com"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
          </div>

          <div className="formGroup right50">
            <label htmlFor="password" className="formlabel">Password</label>
            <input
              type="password"
              placeholder="*****"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
          </div>

          <div className="formGroup right50">
            <label htmlFor="password2" className="formlabel">Confirm Password</label>
            <input
              type="password"
              name="password2"
              placeholder="*****"
              onChange={handleChange}
              value={input.password2}
            />
          </div>

          <div className="btnDiv left10">
            <button
              className="btn btnBlue"
              type="submit"
              onClick={handleSubmit}

            >
              Register
            </button>
          </div>
        </form>
      </div>

      {userState.registerStatus === "rejected" ? (
        <CustomAlert severity="error">{userState.registerError}</CustomAlert>
      ) : null}

      {userState.registerStatus === "fulfilled" ? (
        <Navigate to="/loginsuccess" replace={true} state={{ email }} />
      ) : null}

    </div>
  )
}

export default Register