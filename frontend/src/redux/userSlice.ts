import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { USERS_URL, ADMIN_URL } from '../API/index'
import { User } from '../interfaces/user';
import { RootState } from '../store/store';

interface UserState {
    user: User | null,
    users: User[] | null,
    loading: boolean,
    errors: string,
    credential: Login | null,
    getUsersStatus: string,
    registerStatus: string,
    registerError: string,
    updateUserStatus: string,
    updateError: string,
    deleteUserStatus: string
}

const initialState: UserState = {
    users: [],
    user: null,
    loading: false,
    errors: "",
    credential: null,
    getUsersStatus: "",
    registerStatus: "",
    registerError: "",
    deleteUserStatus: "",
    updateUserStatus:"",
    updateError:""
}

interface Login {
    email: string,
    password: string
}


export interface UpdateArgs {
    id?: string,
    fullName: string | undefined,
    email: string | undefined,
    isActive: boolean | undefined
  }
  


type ErrorI = {
    response?: {
        data?: {
            error?: {
                message: string,
                statusCode: number,
                name: string,
            }
        }
    }
}


export const getUsers = createAsyncThunk<User[]>(
    "users/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(USERS_URL)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const registerUser = createAsyncThunk<Object, User>(
    "users/registerUser",
    async (data, { rejectWithValue }) => {
        try {

            const response = await axios.post(USERS_URL, data)
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

export const registerAdmin = createAsyncThunk<Object, User>(
    "users/registerAdmin",
    async (data, { rejectWithValue }) => {
        try {

            const response = await axios.post(ADMIN_URL, data)
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



export const updateUser = createAsyncThunk<Object, UpdateArgs>(
    "users/updateUser",
    async (data, thunkAPI) => {
        try {
            const {id, fullName, email, isActive } = data
            const response = await axios.patch(USERS_URL + id, { fullName, email, isActive })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteUser = createAsyncThunk< {id: string}, string>(
    "users/deleteUser",
    async (data, thunkAPI) => {
        try {

            const response = await axios.delete(USERS_URL + data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
       
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;         
            state.getUsersStatus = "fullfilled"
        });
          
        builder.addCase(registerUser.fulfilled, (state) => {           
            state.registerStatus = "fullfilled"
        })
        builder.addCase(registerUser.rejected, (state, action) => {         
            state.registerError = JSON.stringify(action.payload);
            state.registerStatus = "rejected";
            state.errors = JSON.stringify(action.error.message)
        })
          
        builder.addCase(updateUser.fulfilled, (state) => {          
            state.updateUserStatus = "fullfilled"
           
        })
        builder.addCase(updateUser.rejected, (state, action) => {          
            state.updateUserStatus = "rejected";
            state.updateError = JSON.stringify(action.payload);
           
        })

        builder.addCase(registerAdmin.fulfilled, (state) => {          
            state.registerStatus = "fullfilled"
        })
        builder.addCase(registerAdmin.rejected, (state, action) => {          
            state.registerStatus = "rejected";
            state.registerError = JSON.stringify(action.payload);
        })
           
        builder.addCase(deleteUser.fulfilled, (state, action) => {          
            state.deleteUserStatus = "fullfilled"

        })
       

    }
})

export default usersSlice.reducer;

export const userDetails = (state: RootState) => state.users.users;
