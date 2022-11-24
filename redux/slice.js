import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

const initialState = {
    toggle: false,
    category: null,
};

const base = createSlice({
    name: "base",
    initialState,
    reducers: {
        setToggle: (state, action) => {
            state.toggle = !state.toggle;
            console.log(state.toggle);
        },
        setCategory: (state, action) => {
            state.category = action.payload;
            console.log(state.category);
        },
    },
});

export default base.reducer;
export const { setToggle, setCategory } = base.actions;
