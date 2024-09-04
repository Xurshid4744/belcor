import { createSlice } from "@reduxjs/toolkit";

type TinitialState = {
  status: string;
  date: string | undefined;
  search: string;
};

const initialState: TinitialState = {
  status: "0",
  date: "",
  search: "asd",
};

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filtering(state, action) {
      const { status, date, search } = action.payload;
      if (status !== undefined) state.status = status;
      if (date !== undefined) state.date = date;
      if (search !== undefined) state.search = search;
    },

    cleaning(state) {
      state.status = "0";
      state.date = "";
      state.search = "";
    },
  },
});

export const { filtering, cleaning } = filter.actions;
export default filter;
