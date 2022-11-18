import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  isLoading: false,
  dataUser: null,
  fixture: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    userRegister: (state, { payload }) => {
      state.dataUser = payload;
    },
    logout: (state) => {
      state.isLoading = false;
      state.isLogged = false;
      localStorage.clear();
    },
    login: (state) => {
      state.isLoading = false;
      state.isLogged = true;
    },
    isChecking: (state) => {
      state.isLoading = true;
    },
    getFixture: (state, { payload }) => {
      state.fixture = payload;
    },
  },
});

export const { logout, userRegister, login, isChecking, getFixture } =
  appSlice.actions;
