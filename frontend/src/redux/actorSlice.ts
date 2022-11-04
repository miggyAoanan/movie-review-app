import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store/store';
import { ACTORS_URL} from '../API'

import {Actor, ActorDetails, ErrorI}  from '../interfaces/index'

interface ActorState {
    actor: ActorDetails | null,
    actors: ActorDetails[] | null,
    loading: boolean,
    errors: string,
    getActorStatus: string,
    addActorStatus: string
    
}

const initialState: ActorState = {
    actor: null,
    actors: [],
    loading: false,
    errors:"",
    getActorStatus:"",
    addActorStatus:""
}

export const getActors = createAsyncThunk<ActorDetails[]>(
    "actors/getActors",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(ACTORS_URL)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const getActor = createAsyncThunk <ActorDetails, string | undefined>(
    "actors/getActors",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(ACTORS_URL+ id )
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addActor = createAsyncThunk<ActorDetails, Object>(
    "actors/addActor",
    async (data, { rejectWithValue }) => {
        try {

            const response = await axios.post(ACTORS_URL, data)
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

export const actorSlice = createSlice({
    name: "actors",
    initialState,
    reducers: {
        setActors: (state = initialState, action: PayloadAction<ActorDetails[]>) => {
            state.actors = action.payload;
        },

        setActor: (state = initialState, action: PayloadAction<Actor>) => {
            state.actor = action.payload;
        },
    },

    extraReducers: (builder) =>{
        builder.addCase(getActors.pending, (state = initialState, action) => {
            state.loading = true;
            state.getActorStatus = "pending"
    
        });
        builder.addCase(getActors.fulfilled, (state, action) => {
            state.actors = action.payload;
            state.loading = false;
            state.getActorStatus = "fullfilled"
        });
        builder.addCase(getActors.rejected, (state, action) => {
            state.errors = JSON.stringify(action.payload);
            state.loading = false;
            state.getActorStatus = "rejected"
        });

    }
})


export default actorSlice.reducer;
export const actorDetails = (state: RootState) => state.actors.actors;
export const actorState = (state: RootState) => state.actors;
export const {setActors, setActor} = actorSlice.actions