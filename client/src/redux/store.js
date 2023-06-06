import { configureStore } from "@reduxjs/toolkit"
import { tweetsApi } from "./services/tweetsApi";
import tweetsReducer from './features/tweetsSlice';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import usersReducer from './features/usersSlice'
import { usersApi } from "./services/usersApi";
import { chatsApi } from "./services/chatsApi";
import messagesSlice from "./features/messagesSlice";
export const store = configureStore({
  reducer: {
    tweetsReducer,
    [tweetsApi.reducerPath]: tweetsApi.reducer,
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    chats: usersReducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    messages: messagesSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([tweetsApi.middleware, usersApi.middleware, chatsApi.middleware])
});

setupListeners(store.dispatch);
