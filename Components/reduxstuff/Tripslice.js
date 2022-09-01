import {createSlice} from "@reduxjs/toolkit";

export const tripSlice = createSlice({
    name:"trip",
    initialState:{
        tripsfound:false,
        trips:null
    },
    reducers:{
        set_trips_active:(state,action)=>{
            state.tripsfound = true,
            state.trips = action.payload
        },
        remove_trips_active:(state)=>{
            state.tripsfound = false,
            state.trips = null
        }
    }
})

export const {set_trips_active,remove_trips_active} = tripSlice.actions;

export default tripSlice.reducer