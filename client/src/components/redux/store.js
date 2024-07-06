import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";
import messageSlice from "./messageSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import socketSlice from "./socketSlice";

const persistConfig = {
  key: "tweeter29",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: userSlice,
  tweet: tweetSlice,
  message: messageSlice,
  socket: socketSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
