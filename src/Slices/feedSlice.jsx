import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    minJobs: true,
    open: false
}

export const feedSlice = createSlice({
    name:"feed",
    initialState,
    reducers:{
        feedClick: (state, action)=>{
            state.minJobs = action.payload;
        },
        handleOpen: (state, action)=>{
            state.open = action.payload;
        }
    }
})

export const {feedClick, handleOpen} = feedSlice.actions;

export default feedSlice.reducer