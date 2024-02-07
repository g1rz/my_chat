import {api} from './api.js';
import {userDto} from "@/redux/dto/userDto.js";
import {apiEndpoints} from "@/consts/apiEndpoints.js";

export const authApi = api.injectEndpoints({
        endpoints: (builder) => ({
            login: builder.mutation({
                query: (body) => ({
                    url: apiEndpoints.loginPath(),
                    method: 'POST',
                    body,
                }),
                transformResponse: (response) => userDto(response),
            }),
            logout: builder.mutation({
                query: () => ({
                    url: apiEndpoints.logoutPath(),
                    method: 'POST',
                }),
            }),
            registration: builder.mutation({
                query: (body) => ({
                    url: apiEndpoints.registrationPath(),
                    method: 'POST',
                    body,
                }),
                transformResponse: (response) => userDto(response),
            }),
            refreshToken: builder.mutation({
                query: () => ({
                    url: apiEndpoints.refreshPath(),
                    method: 'GET',
                }),
                transformResponse: (response) => userDto(response),
            }),
        }),
    })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLogoutMutation, useRegistrationMutation, useRefreshTokenMutation } = authApi;