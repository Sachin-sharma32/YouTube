import { configureStore } from "@reduxjs/toolkit";
import baseReducer from "./slice";

const store = configureStore({
    reducer: {
        base: baseReducer,
    },
});

export default store;
