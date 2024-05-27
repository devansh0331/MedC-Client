import { configureStore } from "@reduxjs/toolkit";
import feedSlice from "./Slices/feedSlice";

export const store = configureStore({
    reducer:{
        feed: feedSlice
    }
})