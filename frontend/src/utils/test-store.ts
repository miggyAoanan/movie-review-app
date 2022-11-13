
import {
    combineReducers,
    configureStore,
    PreloadedState,
  } from "@reduxjs/toolkit";

import authReducer from '../redux/authSlice'
import userReducer from '../redux/userSlice';
import movieReducer from '../redux/movieSlice'
import actorReducer from '../redux/actorSlice'
import reviewReducer from '../redux/reviewSlice'



// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    auth: authReducer,
    movie: movieReducer,
    actor: actorReducer,
    user: userReducer,
    review: reviewReducer
  });

  export const createStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState,
    });
  };
  
  export const store = createStore();
  
  export type RootState = ReturnType<typeof rootReducer>;
  export type AppStore = ReturnType<typeof createStore>;
  export type AppDispatch = AppStore["dispatch"];
  
  