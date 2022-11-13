import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store/store';

import { MOVIES_URL, MOVIE_ACTORS_URL, MOVIE_SEARCH_URL } from '../API'

import { MovieDetails, ErrorI } from '../interfaces/index'


interface MovieState {
    movie: MovieDetails | null,
    movies: MovieDetails[] | null,
    loading: boolean,
    errors: string,
    getMovieStatus: string,
    getMovieActorsStatus: string,
    addMovieStatus: string,
    updateMovieStatus: string,
    deleteMovieStatus: string,
    searchMovieStatus: string;

}

const initialState: MovieState = {
    movies: [],
    movie: null,
    loading: false,
    errors: "",
    getMovieStatus: "",
    getMovieActorsStatus:"",
    addMovieStatus: "",
    updateMovieStatus: "",
    deleteMovieStatus: "",
    searchMovieStatus:""

}


export const getMovies = createAsyncThunk<MovieDetails[]>(
    "movies/getMovies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(MOVIES_URL)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



export const getMovie = createAsyncThunk<MovieDetails, string | undefined>(
    "movies/getMovie",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(MOVIES_URL + id)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getMovieActors = createAsyncThunk<MovieDetails, string | undefined>(
    "movies/getMovieActors",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(MOVIE_ACTORS_URL + id)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addMovie = createAsyncThunk<MovieDetails, Object>(
    "movies/addMovie",
    async (data, { rejectWithValue }) => {
        try {

            const response = await axios.post(MOVIES_URL, data)
            return response.data
        } catch (error: unknown) {
            if (error) {
                let message: ErrorI = error
                return rejectWithValue(message.response?.data?.error?.message)
            }
            else {
                return rejectWithValue(error)
            }
        }
    }
)


export const updateMovie = createAsyncThunk<Object, { id: string | undefined, cost: number | undefined, imageURL: string | undefined }>(
    "movies/updateMovie",
    async (data, thunkAPI) => {
        try {
            const { id, cost, imageURL } = data
            const response = await axios.patch(MOVIES_URL + id, { cost, imageURL })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteMovie = createAsyncThunk<{ id: string }, string>(
    "movies/deleteMovie",
    async (data, thunkAPI) => {
        try {

            const response = await axios.delete(MOVIES_URL + data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const searchMovies = createAsyncThunk(
    "movies/searcheMovies",
    async (term: string, thunkAPI) => {
        try {
            const response = await axios.get(MOVIE_SEARCH_URL + term)
            return response.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
  );



export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.loading = false;
            state.getMovieStatus = "fullfilled"
        });
       

       
        builder.addCase(getMovie.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading = false;
            state.getMovieStatus = "fullfilled"
        });
       
        builder.addCase(getMovieActors.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading = false;
            state.getMovieActorsStatus = "fullfilled"
        });
           
        builder.addCase(addMovie.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading = false;
            state.addMovieStatus = "fullfilled"
        });
        
        builder.addCase(updateMovie.fulfilled, (state, action) => {
            state.loading = false;
            state.addMovieStatus = "fullfilled"
        });
        builder.addCase(updateMovie.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.addMovieStatus = "rejected"
        });

      
        builder.addCase(deleteMovie.fulfilled, (state, action) => {
            state.loading = false;
            state.deleteMovieStatus = "fullfilled"

        });
      
        builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.loading = false;
            state.searchMovieStatus = "fullfilled";
           
        });
       

    },

})

export default movieSlice.reducer;
export const movieDetails = (state: RootState) => state.movies.movies;



