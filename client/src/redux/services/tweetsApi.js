import { API_URL } from "../../../utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const { initialState } = require("@/data/tweets.js");

export const tweetsApi = createApi(
  {
    reducerPath: "tweetsApi",
    refetchOnFocus: false, // when the window is refocused, refetch the data
    refetchOnMountOrArgChange: 120,
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/`, }),
    tagTypes: ["Tweets"],
    endpoints: (builder) => ({
      getAllTweets: builder.query({
        query: () => ({
          url: "tweets/all",
          method: 'GET',
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        }),
        providesTags: ["Tweets"],
        // transformResponse: (response) => {
        //   return [...response, ...initialState]
        // }
      }),
      getAllTweetsFollowed: builder.query({
        query: (token) => ({
          url: "tweets/allFollowed",
          method: 'GET',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: ["Tweets"],
        // transformResponse: (response) => {
        //   return [...response, ...initialState]
        // }
      }),
      getTweetsByUserId: builder.query({
        query: ({ userId }) => `user/${userId}`,
      }),
      getTweetById: builder.query({
        query: (id) => `tweets/${id}`,
      }),
      getCommentById: builder.query({
        query: (id) => `comments/${id}`,
      }),
      // confirmToken: builder.query({
      //   query: ({ token}) => `confirm/${token}`,
      // }),
      createTweet: builder.mutation({
        query: ({ body, token }) => ({
          url: "tweets/create",
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          formData: true,
          body,
        }),
        invalidatesTags: ["Tweets"],
      }),
      likeTweet: builder.mutation({
        query: ({ tweetId, token }) => ({
          url: `tweets/like/${tweetId}`,
          method: 'PUT',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Tweets"],
      }),
      createCommentTweet: builder.mutation({
        query: ({ body, token }) => ({
          url: `comments`,
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body
        }),
        invalidatesTags: ["Tweets"],
      }),
      reTweet: builder.mutation({
        query: ({ tweetId, token }) => ({
          url: `tweets/retweet/${tweetId}`,
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Tweets"],
      }),
      undoReTweet: builder.mutation({
        query: ({ tweetId, token }) => ({
          url: `tweets/retweet/${tweetId}`,
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Tweets"],
      }),
    }),

  }
)

export const { useGetAllTweetsQuery, useGetAllTweetsFollowedQuery, useGetTweetsByUserIdQuery, useCreateTweetMutation, useLikeTweetMutation, useCreateCommentTweetMutation, useReTweetMutation, useUndoReTweetMutation, useGetTweetByIdQuery, useGetCommentByIdQuery } = tweetsApi
