import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    minJobs: false
}

export const feedSlice = createSlice({
    name:"feed",
    initialState,
    reducers:{
        feedClick: (state, action)=>{
            state.minJobs = action.payload;
        },
    }
})

export const {feedClick} = feedSlice.actions;

export default feedSlice.reducer