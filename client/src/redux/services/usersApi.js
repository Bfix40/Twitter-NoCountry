import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    refetchOnFocus: false,
    baseQuery: fetchBaseQuery({
        baseUrl: "http://absorbing-record-production.up.railway.app/api/users/",
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "all",
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            }),
            providesTags: ["Users"],
        }),
        getMyProfile: builder.query({
            query: () => ({
                url: "me",
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            }),
        }),
        getUserById: builder.query({
            query: (userId) => `profile/${userId}`,
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: "create",
                method: "POST",
                credentials: "include",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        followUser: builder.mutation({
            query: (userId) => ({
                url: `follow/${userId}`,
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            }),
        }),
        unFollowUser: builder.mutation({
            query: (userId) => ({
                url: `unfollow/${userId}`,
                method: "DELETE",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useFollowUserMutation, useUnFollowUserMutation, useGetMyProfileQuery } = usersApi;
