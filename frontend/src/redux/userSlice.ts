import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    loginStatus: string
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
    loginStatus: ""
}

interface Login {
    email: string,
    password: string
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

export const login = createAsyncThunk<Login, Object>(
    "users/login",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(USERS_URL + "login", data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const updateUser = createAsyncThunk<Object, User>(
    "users/updateUser",
    async (data, thunkAPI) => {
        try {
            const { fullName, email, id } = data
            const response = await axios.patch(USERS_URL + id, { fullName, email })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteUser = createAsyncThunk<Object, User>(
    "users/deleteUser",
    async (data, thunkAPI) => {
        try {

            const response = await axios.delete(USERS_URL + data?.id)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


//reducers -> reduce to a specific state -> changes state 

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state = initialState, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state = initialState, action) => {
            state.loading = true;
            state.getUsersStatus = "pending"

        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.getUsersStatus = "fullfilled"
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.getUsersStatus = "rejected"
        });
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.registerStatus = "pending"

        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.registerStatus = "fullfilled"


        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;

            state.registerError = JSON.stringify(action.payload);
            state.registerStatus = "rejected"
            state.errors = JSON.stringify(action.error.message)
        })
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.loginStatus = "pending"
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.credential = action.payload;
            state.loginStatus = "fullfilled"
            localStorage.setItem("token", JSON.stringify(state.credential))

        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.errors = JSON.stringify(action.error.message)
            state.loginStatus = "rejected"
        })
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateUser.fulfilled, (state) => {
            state.loading = false;

        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.errors = JSON.stringify(action.error.message)
        })

        builder.addCase(registerAdmin.pending, (state) => {
            state.loading = true
            state.registerStatus = "pending"

        });
        builder.addCase(registerAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.registerStatus = "fullfilled"


        })
        builder.addCase(registerAdmin.rejected, (state, action) => {
            state.loading = false;

            state.registerError = JSON.stringify(action.payload);
            state.registerStatus = "rejected"
            state.errors = JSON.stringify(action.error.message)
        })

    }
})

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions
export const userDetails = (state: RootState) => state.users.users;
export const userState = (state: RootState) => state.users;