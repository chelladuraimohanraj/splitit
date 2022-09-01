import { createSlice } from "@reduxjs/toolkit";

export const authSlice  = createSlice({
    name: "auth",
    initialState:{
        is_authenticated : false,
        user:null,
    },
    reducers:{
        set_authenticated : (state,action) =>{
            state.is_authenticated = true,
            state.user = action.payload
        },
        remove_authenticated : state =>{
            state.is_authenticated = false,
            state.user=null
        },
      

    }
})


export const {set_authenticated,remove_authenticated}  = authSlice.actions;

export default authSlice.reducer