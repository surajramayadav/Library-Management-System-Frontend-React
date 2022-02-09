import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const homeslice = createSlice({
  name: 'home',
  initialState: {
    loading: false,
    
  },
  reducers: {
    setloading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

//actions
export const { setloading } = homeslice.actions;


export default homeslice.reducer;
