import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { ACTORS_URL, ACTORS_SEARCH_URL } from '../API';

import { Actor, ActorDetails, ErrorI } from '../interfaces/index';

export interface ActorState {
    actor: ActorDetails | null,
    actors: ActorDetails[] | null,
    loading: boolean,
    errors: any,
    getActorStatus: string,
    addActorStatus: string,
    updateActorStatus: string,
    deleteActorStatus: string,
    searchActorStatus: string,

}

export const initialState: ActorState = {
    actor: null,
    actors: [],
    loading: false,
    errors: "",
    getActorStatus: "",
    addActorStatus: "",
    updateActorStatus: "",
    deleteActorStatus: "",
    searchActorStatus: ""
}

export const getActors = createAsyncThunk<ActorDetails[]>(
    "actors/getActors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(ACTORS_URL)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const getActor = createAsyncThunk<ActorDetails, string | undefined>(
    "actors/getActor",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(ACTORS_URL + id)

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

export const updateActor = createAsyncThunk<Object, Actor>(
    "actors/updateActor",
    async (data, thunkAPI) => {
        try {
            const { id, firstName, lastName, gender, age, imageURL } = data
            const response = await axios.patch(ACTORS_URL + id, { firstName, lastName, gender, age, imageURL })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteActor = createAsyncThunk<{ id: string }, string>(
    "actors/deleteActor",
    async (data: string, thunkAPI) => {
        try {

            const response = await axios.delete(ACTORS_URL + data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const searcheActors = createAsyncThunk(
    "actors/searcheActors",
    async (name: string, thunkAPI) => {
        try {
            const response = await axios.get(ACTORS_SEARCH_URL + name)
            return response.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);



export const actorSlice = createSlice({
    name: "actors",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(getActors.fulfilled, (state, action: PayloadAction<ActorDetails[]>) => {
            state.actors = action.payload;
            state.loading = false;
            state.getActorStatus = "fullfilled"
        });
        builder.addCase(getActors.rejected, (state) => {
            state.loading = false;
            state.getActorStatus = "rejected"
        });
        builder.addCase(getActors.pending, (state) => {
            state.loading = true;
            state.getActorStatus = "pending"
        });
        builder.addCase(addActor.fulfilled, (state, action: PayloadAction<Actor>) => {
            state.actor = action.payload;
            state.loading = false;
            state.addActorStatus = "fullfilled"
        });
        builder.addCase(addActor.rejected, (state) => {
            state.loading = false;
            state.addActorStatus = "rejected"
        });
        builder.addCase(addActor.pending, (state) => {
            state.loading = true;
            state.addActorStatus = "pending"
        });

        builder.addCase(getActor.fulfilled, (state, action: PayloadAction<Actor>) => {
            state.actor = action.payload;
            state.loading = false;
            state.getActorStatus = "fullfilled"
        });
        builder.addCase(getActor.rejected, (state) => {
            state.loading = false;
            state.getActorStatus = "rejected"
        });
        builder.addCase(getActor.pending, (state) => {
            state.loading = true;
            state.getActorStatus = "pending"
        });


        builder.addCase(updateActor.fulfilled, (state) => {
            state.loading = false;
            state.updateActorStatus = "fullfilled"

        });
        builder.addCase(updateActor.rejected, (state) => {
            state.loading = false;
            state.updateActorStatus = "rejected"

        });
        builder.addCase(updateActor.pending, (state) => {
            state.loading = true;
            state.updateActorStatus = "pending"

        });

        builder.addCase(deleteActor.fulfilled, (state) => {
            state.loading = false;
            state.deleteActorStatus = "fullfilled"
        });
        builder.addCase(deleteActor.rejected, (state) => {
            state.loading = false;
            state.deleteActorStatus = "rejected"
        });
        builder.addCase(deleteActor.pending, (state) => {
            state.loading = true;
            state.deleteActorStatus = "pending"
        });

        builder.addCase(searcheActors.fulfilled, (state, action) => {
            state.actors = action.payload;
            state.loading = false;
            state.searchActorStatus = "fullfilled"
        });
        builder.addCase(searcheActors.rejected, (state) => {
            state.loading = false;
            state.searchActorStatus = "rejected"
        });
        builder.addCase(searcheActors.pending, (state) => {
            state.loading = true;
            state.searchActorStatus = "pending"
        });


    }
})


export default actorSlice.reducer;
export const actorDetails = (state: RootState) => state.actors.actors;
