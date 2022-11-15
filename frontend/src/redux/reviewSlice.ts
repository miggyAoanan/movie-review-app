import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { REVIEWS_URL, MOVIE_REVIEWS_URL } from '../API';

import  { Review, ErrorI } from '../interfaces/index';

export interface UpdateArgs {
    id?: string,
    isActive: boolean | undefined
  }
  
export interface AddReviewArgs {
    description:string |undefined, 
    rating:number |undefined, 
    movieId:string |undefined, 
    userId:string |undefined, 
    userName:string | undefined,
    movieName:string |undefined
    isActive: boolean
}

export interface ReviewState {
    review: Review | null,
    reviews: Review[],
    loading: boolean,
    errors: string,
    getReviewStatus: string,
    addReviewStatus: string,
    addMovieReviewStatus:string,
    updateReviewStatus: string,
    deleteReviewStatus: string,

}

export const initialState: ReviewState = {
    review: null,
    reviews: [],
    loading: false,
    errors: "",
    getReviewStatus: "",
    addReviewStatus: "",
    addMovieReviewStatus: "",
    updateReviewStatus: "",
    deleteReviewStatus:""
}

export const getReviews = createAsyncThunk<Review[]>(
    "reviews/getReviews",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(REVIEWS_URL)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const getReview = createAsyncThunk<Review, string | undefined>(
    "reviews/getReview",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(REVIEWS_URL + id)

            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addReview = createAsyncThunk<Review, Object>(
    "reviews/addReview",
    async (data, { rejectWithValue }) => {
        try {

            const response = await axios.post(REVIEWS_URL, data)
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

export const addMovieReview = createAsyncThunk<Review, AddReviewArgs>(
    "reviews/addReview",
    async (data, { rejectWithValue }) => {
        try {
           
            const response = await axios.post(MOVIE_REVIEWS_URL+ data.movieId+ "/reviews", data)
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

export const updateReview = createAsyncThunk<Object, UpdateArgs>(
    "reviews/updateReview",
    async (data, thunkAPI) => {
        try {
            const { id, isActive } = data
            const response = await axios.patch(REVIEWS_URL + id, { isActive  })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteReview = createAsyncThunk< {id: string}, string>(
    "reviews/deleteReview",
    async (data, thunkAPI) => {
        try {

            const response = await axios.delete(REVIEWS_URL + data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
       
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loading = false;
            state.getReviewStatus = "fullfilled"
        });
        builder.addCase(getReviews.rejected, (state) => {
            state.loading = false;
            state.getReviewStatus = "rejected"
        });
        builder.addCase(getReviews.pending, (state) => {
            state.loading = true;
            state.getReviewStatus = "pending"
        });

        builder.addCase(getReview.fulfilled, (state, action) => {
            state.review = action.payload;
            state.loading = false;
            state.getReviewStatus = "fullfilled"
        });
        builder.addCase(getReview.rejected, (state) => {
            state.loading = false;
            state.getReviewStatus = "rejected"
        });
        builder.addCase(getReview.pending, (state) => {
            state.loading = true;
            state.getReviewStatus = "pending"
        });
       
        builder.addCase(updateReview.fulfilled, (state) => {
            state.loading = false;
            state.updateReviewStatus = "fullfilled"

        });
        builder.addCase(updateReview.rejected, (state) => {
            state.loading = false;
            state.updateReviewStatus = "rejected"

        });
        builder.addCase(updateReview.pending, (state) => {
            state.loading = true;
            state.updateReviewStatus = "pending"

        });
       
      
        builder.addCase(deleteReview.fulfilled, (state) => {
            state.loading = false;
            state.deleteReviewStatus = "fullfilled"

        });
       
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.deleteReviewStatus = "rejected"
        });
        builder.addCase(deleteReview.pending, (state) => {
            state.loading = true;
            state.deleteReviewStatus = "pending"

        });

        builder.addCase(addReview.fulfilled, (state, action) => {
            state.review = action.payload;
            state.loading = false;
            state.addReviewStatus = "fullfilled"
        });
        builder.addCase(addReview.rejected, (state) => {
            state.loading = false;
            state.addReviewStatus = "rejected"
        });
        builder.addCase(addReview.pending, (state) => {
            state.loading = true;
            state.addReviewStatus = "pending"
        });
        




    }
})


export default reviewSlice.reducer;

export const reviewDetails = (state:RootState) => state.reviews.reviews;
