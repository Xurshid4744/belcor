import { createSlice } from "@reduxjs/toolkit";

type TinitialState = {
  open: boolean;
  message: string;
  anchorOrigin: {
    vertical: string;
    horizontal: string;
  };
};

const initialState: TinitialState = {
  open: false,
  message: "Note archived",
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

const snackbar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar(state, action) {
      const { open, message, anchorOrigin } = action.payload;
      state.open = open || initialState.open;
      state.message = message || initialState.message;
      state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
    },

    closeSnackbar(state) {
      state.open = false;
    },
  },
});

export const { closeSnackbar, openSnackbar } = snackbar.actions;
export default snackbar;

