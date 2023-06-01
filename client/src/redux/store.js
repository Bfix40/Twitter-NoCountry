import { configureStore } from "@reduxjs/toolkit"
import { tweetsApi } from "./services/tweetsApi";
import tweetsReducer from './features/tweetsSlice';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import usersReducer from './features/usersSlice'
import { usersApi } from "./services/usersApi";
export const store = configureStore({
  reducer: {
    tweetsReducer,
    [tweetsApi.reducerPath]: tweetsApi.reducer,
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([tweetsApi.middleware, usersApi.middleware])
});

setupListeners(store.dispatch);
