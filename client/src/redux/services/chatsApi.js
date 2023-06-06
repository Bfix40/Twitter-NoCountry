import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/api";

export const chatsApi = createApi({
  reducerPath: "chatsApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/chat`, }),
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    fetchChats: builder.query({
      query: (userId) => ({
        url: `?userId=${userId}`,
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      })
    }),
  })
})

export const { useFetchChatsQuery } = chatsApi
