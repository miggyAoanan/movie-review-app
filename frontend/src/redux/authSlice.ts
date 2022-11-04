import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store/store';

export interface AuthState {
    fullName: string | null;
    token: string | null;
    permissions: string |null;
}


const initialState: AuthState = {
    fullName: null,
    token: null,
    permissions: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            localStorage.setItem("user", JSON.stringify({
                fullName: action.payload.fullName,
                token: action.payload.token,
                permissions: action.payload.permissions
            })
            );
            state.fullName = action.payload.fullName;
            state.token = action.payload.token;
            state.permissions= action.payload.permissions
        },

        logout: (state) => {
            localStorage.clear();
            state.fullName = null;
            state.token = null;
            state.permissions = null;
        }
    }
})


export const selectAuth = (state: RootState) => state.auth;
export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;