import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import userReducer from '../redux/userSlice';
import movieReducer from '../redux/movieSlice'


export const store =  configureStore({
    reducer:{
        users: userReducer,
        movies: movieReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type Rootstate = ReturnType <typeof store.getState>

export type AddDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AddDispatch>();

export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector