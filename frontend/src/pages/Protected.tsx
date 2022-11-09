import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectAuth, setUser } from '../redux/authSlice'

import { Navigate, Outlet } from "react-router-dom";
const Protected = () => {
    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const { permissions } = useAppSelector(selectAuth)
  
    useEffect(() => {
      dispatch(setUser(user))
  
    }, [])

    
  if (!user ||  permissions !== "admin") { return <Navigate to="/" />;}
  return <Outlet />;
  
  
}

export default Protected