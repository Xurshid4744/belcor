import { createSlice } from "@reduxjs/toolkit";

type TinitialState = {
  token: string | null;
  isLogin: boolean;
  userName: string;
};

const initialState: TinitialState = {
  token: null,
  isLogin: false,
  userName: "Admin",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const { token } = action.payload;
      state.isLogin = true;
      state.token = token || initialState.token;
    },
  },
});

export const { login } = user.actions;
export default user;
