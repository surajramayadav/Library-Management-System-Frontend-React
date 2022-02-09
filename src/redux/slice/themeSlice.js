import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const themeslice = createSlice({
    name: 'dark',
    initialState: {
        dark: false
    },
    reducers: {
        setDark: (state, action) => {
            state.dark = action.payload;
        },



    },
});

//actions
export const { setDark, } = themeslice.actions;


export default themeslice.reducer;
