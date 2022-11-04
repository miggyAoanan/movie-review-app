import React, { useState, useCallback, useEffect } from "react";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import { styled } from '@mui/material/styles'

import { login } from "../../redux/userSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useLoginUserMutation } from '../../authServices/authApi'
import { setUser } from "../../redux/authSlice";

const CustomAlert = styled(Alert)({}) as typeof Alert

const Login = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.users)

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;
  const [loginUser,
    { data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError }
  ] = useLoginUserMutation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  // const handleSubmit = (event: React.SyntheticEvent): void => {
  //   event.preventDefault()
  //   const userData = { email, password };
  //   if (email === "") {
  //     alert("Email is required");
  //   } else if (password === "") {
  //     alert("Password is required");
  //   } else {
  //     dispatch(login(userData));

  //   }
  // }


  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(email && password) {
      await loginUser({email, password})
    }
    else{
      <Alert severity="error">{userState.errors}</Alert>
    }
  }

  useEffect(()=>{
    if(isLoginSuccess){
      // <Alert severity="success">Login Success</Alert>
      alert("login successfull");
      console.log(loginData);

      dispatch(setUser({fullName: loginData.data.fullName, token: loginData.data.token, permissions: loginData.data.permissions}))
      console.log(isLoginSuccess)
    }

  },[isLoginSuccess])

  return (
    <div className="wrapper mt100">
      <h2 className="mb50">Login</h2>
      <div className="form">
        <form className="form" method="post">
          <div className="formGroup right40">

            <label htmlFor="email" className="formlabel">Email</label>
            <input
              type="email"
              placeholder="ann.hunter@mail.com"
              id="email"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
          </div>
          <div className="formGroup right40">

            <label htmlFor="password" className="formlabel">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
              value={input.password}
            />
          </div>
          <div className="btnDiv">
            <button
              className="btn btnBlue"
              type="submit"
              onClick={(e)=> handleSubmit(e)}

            >
              Login
            </button>
          </div>
        </form>
      </div>
      {userState.loginStatus === "rejected" ? (
        <Alert severity="error">{userState.errors}</Alert>
      ) : null}

      {userState.loginStatus === "success" ? (
        <Navigate to="/loginsuccess" replace={true} state={{ email }} />
      ) : null}
    </div>
  )
}

export default Login