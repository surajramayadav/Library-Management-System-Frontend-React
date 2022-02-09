import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginlice = createSlice({
  name: "login",
  initialState: {
    userLogin: false,
    adminLogin: false,
    userData: [],
    adminData: [],
  },
  reducers: {
    setuserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setadminLogin: (state, action) => {
      state.adminLogin = action.payload;
    },
    setuserData: (state, action) => {
      state.userData = action.payload;
    },
    setadminData: (state, action) => {
      state.adminData = action.payload;
    },
  },
});

//actions
export const { setuserLogin, setadminLogin, setuserData,setadminData } = loginlice.actions;

export default loginlice.reducer;
