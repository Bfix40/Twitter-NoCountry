import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../utils/api";
import { useSession } from "next-auth/react";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (prop) => {
    const response = await fetch(
      `${API_URL}/api/chat?userId=${prop.userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${prop.token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
