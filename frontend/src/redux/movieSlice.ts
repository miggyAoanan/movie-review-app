import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store/store';

import { MOVIES_URL, MOVIE_ACTORS_URL } from '../API'

import { MovieDetails, ErrorI } from '../interfaces/index'


interface MovieState {
    movie: MovieDetails | null,
    movies: MovieDetails[] | null,
    loading: boolean,
    errors: string,
    getMovieStatus: string,
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


export const searcheMovies = createAsyncThunk(
    "movies/searcheMovies",
    async (title: string, thunkAPI) => {
        try {
            const response = await axios.get(MOVIES_URL + title)
            return response.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
  );



export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state = initialState, action: PayloadAction<MovieDetails[]>) => {
            state.movies = action.payload;
        }


    },
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state = initialState, action) => {
            state.loading = true;
            state.getMovieStatus = "pending"

        });
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.loading = false;
            state.getMovieStatus = "fullfilled"
        });
        builder.addCase(getMovies.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.getMovieStatus = "rejected"
        });

        builder.addCase(getMovie.pending, (state = initialState, action) => {
            state.loading = true;
            state.getMovieStatus = "pending"

        });
        builder.addCase(getMovie.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading = false;
            state.getMovieStatus = "fullfilled"
        });
        builder.addCase(getMovie.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.getMovieStatus = "rejected"
        });

        builder.addCase(getMovieActors.pending, (state = initialState, action) => {
            state.loading = true;
            state.getMovieStatus = "pending"

        });
        builder.addCase(getMovieActors.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading = false;
            state.getMovieStatus = "fullfilled"
        });
        builder.addCase(getMovieActors.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.addMovieStatus = "rejected"
        });

        builder.addCase(addMovie.pending, (state = initialState, action) => {
            state.loading = true;
            state.addMovieStatus = "pending"

        });
        builder.addCase(addMovie.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading = false;
            state.addMovieStatus = "fullfilled"
        });
        builder.addCase(addMovie.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.addMovieStatus = "rejected"
        });

        builder.addCase(updateMovie.pending, (state = initialState, action) => {
            state.loading = true;
            state.addMovieStatus = "pending"

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

        builder.addCase(deleteMovie.pending, (state = initialState, action) => {
            state.loading = true;
            state.deleteMovieStatus = "pending"

        });
        builder.addCase(deleteMovie.fulfilled, (state, action) => {
            state.loading = false;
            state.deleteMovieStatus = "fullfilled"

        });
        builder.addCase(deleteMovie.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.deleteMovieStatus = "rejected"
        });

        builder.addCase(searcheMovies.pending, (state = initialState) => {
            state.loading = true;
            state.searchMovieStatus = "pending"

        });
        builder.addCase(searcheMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.loading = false;
            state.searchMovieStatus = "fullfilled"

        });
        builder.addCase(searcheMovies.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.searchMovieStatus = "rejected"
        });

    },

})

export default movieSlice.reducer;
export const movieDetails = (state: RootState) => state.movies.movies;
export const { setMovies } = movieSlice.actions


