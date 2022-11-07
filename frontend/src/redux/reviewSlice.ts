import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store/store';
import { REVIEWS_URL } from '../API'

import  { Review, ErrorI } from '../interfaces/index'

interface ReviewState {
    review: Review | null,
    reviews: Review[],
    loading: boolean,
    errors: string,
    getReviewStatus: string,
    addReviewStatus: string,
    updateReviewStatus: string,
    deleteReviewStatus: string,

}

const initialState: ReviewState = {
    review: null,
    reviews: [],
    loading: false,
    errors: "",
    getReviewStatus: "",
    addReviewStatus: "",
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

export const updateReview = createAsyncThunk<Object, Review>(
    "reviews/updateReview",
    async (data, thunkAPI) => {
        try {
            const { id, description, rating, userId, movieId  } = data
            const response = await axios.patch(REVIEWS_URL + id, { description, rating, userId, movieId  })
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
    reducers: {
        setReviews: (state = initialState, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload;
        },

        setReview: (state = initialState, action: PayloadAction<Review>) => {
            state.review = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state = initialState, action) => {
            state.loading = true;
            state.getReviewStatus = "pending"

        });
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loading = false;
            state.getReviewStatus = "fullfilled"
        });

        builder.addCase(getReviews.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.getReviewStatus = "rejected"
        });

        builder.addCase(getReview.pending, (state = initialState, action) => {
            state.loading = true;
            state.getReviewStatus = "pending"

        });
        builder.addCase(getReview.fulfilled, (state, action) => {
            state.review = action.payload;
            state.loading = false;
            state.getReviewStatus = "fullfilled"
        });

        builder.addCase(getReview.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.getReviewStatus = "rejected"
        });

        builder.addCase(updateReview.pending, (state = initialState, action) => {
            state.loading = true;
            state.updateReviewStatus = "pending"

        });
        builder.addCase(updateReview.fulfilled, (state, action) => {
           
            state.loading = false;
            state.updateReviewStatus = "fullfilled"

        });
        builder.addCase(updateReview.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.updateReviewStatus = "rejected"
        });

        builder.addCase(deleteReview.pending, (state = initialState, action) => {
            state.loading = true;
            state.deleteReviewStatus = "pending"

        });
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false;
            state.deleteReviewStatus = "fullfilled"

        });
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.deleteReviewStatus = "rejected"
        });



    }
})


export default reviewSlice.reducer;

export const reviewDetails = (state:RootState) => state.reviews.reviews;
export const reviewState = (state: RootState) => state.reviews
export const {setReviews, setReview} = reviewSlice.actions
