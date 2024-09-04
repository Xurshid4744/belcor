import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

import { persistReducer, persistStore } from "redux-persist";
import snackbar from "./slices/snackbar";
import storage from "redux-persist/lib/storage";
import { loginApi } from "./endpoints/login";
import user from "./slices/user";
import filter from "./slices/filter";
import { getOrder } from "./endpoints/order";

const rootReducer = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  [getOrder.reducerPath]: getOrder.reducer,
  snackbar: snackbar.reducer,
  user: user.reducer,
  filter: filter.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(loginApi.middleware)
      .concat(getOrder.middleware),
});

const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };
