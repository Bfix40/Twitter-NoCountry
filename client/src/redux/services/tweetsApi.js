import { API_URL } from "../../../utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const { initialState } = require("@/data/tweets.js");

export const tweetsApi = createApi({
  reducerPath: "tweetsApi",
  refetchOnFocus: false, // when the window is refocused, refetch the data
  refetchOnMountOrArgChange: 120,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  tagTypes: ["Tweets"],
  endpoints: (builder) => ({
    getAllTweets: builder.query({
      query: () => ({
        url: "tweets/all",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      providesTags: ["Tweets"],
      // transformResponse: (response) => {
      //   return [...response, ...initialState]
      // }
    }),
    getAllTweetsFollowed: builder.query({
      query: (token) => ({
        url: "tweets/allFollowed",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
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
      providesTags: ["TweetById"],
    }),
    getTweetById: builder.query({
      query: (id) => `tweets/${id}`,
      providesTags: ["TweetById"],
    }),
    getCommentById: builder.query({
      query: (id) => `comments/${id}`,
      providesTags: ["TweetById"],
    }),
    // confirmToken: builder.query({
    //   query: ({ token}) => `confirm/${token}`,
    // }),
    createTweet: builder.mutation({
      query: ({ body, token }) => ({
        url: "tweets/create",
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        formData: true,
        body,
      }),
      invalidatesTags: ["Tweets"],
    }),
    deleteTweet: builder.mutation({
      query: ({ id, token }) => ({
        url: `tweets/${id}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Tweets", "TweetById"],
    }),
    likeTweet: builder.mutation({
      query: ({ tweetId, token }) => ({
        url: `tweets/like/${tweetId}`,
        method: "PUT",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Tweets", "TweetById"],
    }),
    createCommentTweet: builder.mutation({
      query: ({ body, token }) => ({
        url: `comments`,
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Tweets", "TweetById"],
    }),
    reTweet: builder.mutation({
      query: ({ tweetId, token }) => ({
        url: `tweets/retweet/${tweetId}`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Tweets"],
    }),
    undoReTweet: builder.mutation({
      query: ({ tweetId, token }) => ({
        url: `tweets/retweet/${tweetId}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Tweets", "TweetById"],
    }),
    likeComment: builder.mutation({
      query: ({ commentId, token }) => ({
        url: `comments/like/${commentId}`,
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["TweetById"],
    }),
    dislikeComment: builder.mutation({
      query: ({ commentId, token }) => ({
        url: `comments/like/${commentId}`,
        method: "delete",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["TweetById"],
    }),
  }),
});

export const {
  useGetAllTweetsQuery,
  useGetAllTweetsFollowedQuery,
  useGetTopHashtagsQuery,
  useGetTweetsByUserIdQuery,
  useCreateTweetMutation,
  useLikeTweetMutation,
  useLikeCommentMutation,
  useDislikeCommentMutation,
  useDeleteTweetMutation,
  useCreateCommentTweetMutation,
  useReTweetMutation,
  useUndoReTweetMutation,
  useGetTweetByIdQuery,
  useGetCommentByIdQuery,
} = tweetsApi;
