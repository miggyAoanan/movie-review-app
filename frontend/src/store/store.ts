import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { setupListeners } from "@reduxjs/toolkit/query/react"

import authReducer from '../redux/authSlice'
import userReducer from '../redux/userSlice';
import movieReducer from '../redux/movieSlice'

import { authApi } from '../authServices/authApi'


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//hooks to use allthroughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch)