import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '@/api/routes.js';
import {userDto} from "@/redux/dto/userDto.js";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
        reducerPath: 'userApi',
        baseQuery: fetchBaseQuery({
            baseUrl: api.baseApiPath()
        }),
        tagTypes: ["User"],
        endpoints: (builder) => ({
            login: builder.mutation({
                query: (body) => ({
                    url: `/login`,
                    method: 'POST',
                    body,
                }),
                transformResponse: (response) => userDto(response),
                invalidatesTags: [{ type: 'User', id: 'LIST' }],
            }),
            logout: builder.mutation({
                query: () => ({
                    url: `/logout`,
                    method: 'POST',
                }),
            }),
            registration: builder.mutation({
                query: (body) => ({
                    url: '/registration',
                    method: 'POST',
                    body,
                }),
                transformResponse: (response) => userDto(response),
                invalidatesTags: [{ type: 'User', id: 'LIST' }],
            }),
            refreshToken: builder.mutation({
                query: () => ({
                    url: '/refresh',
                    method: 'GET',
                }),
                transformResponse: (response) => userDto(response),
            }),
        }),
    })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLogoutMutation, useRegistrationMutation, useRefreshTokenMutation } = userApi;