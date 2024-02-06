import {api} from './api.js';
import {userDto} from "@/redux/dto/userDto.js";
import {removeUser, setUser} from "@/redux/slices/userSlice.js";

// Define a service using a base URL and expected endpoints
export const authApi = api.injectEndpoints({
        endpoints: (builder) => ({
            login: builder.mutation({
                query: (body) => ({
                    url: `/login`,
                    method: 'POST',
                    body,
                }),
                transformResponse: (response) => userDto(response),
                invalidatesTags: [{ type: 'User', id: 'LIST' }],
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        const response = await queryFulfilled;
                        dispatch(setUser(response.data));
                    } catch (error) {
                        console.log(error);
                    }
                },
            }),
            logout: builder.mutation({
                query: () => ({
                    url: `/logout`,
                    method: 'POST',
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(removeUser());
                    } catch (error) {
                        console.log(error);
                    }
                },
            }),
            registration: builder.mutation({
                query: (body) => ({
                    url: '/registration',
                    method: 'POST',
                    body,
                }),
                transformResponse: (response) => userDto(response),
                invalidatesTags: [{ type: 'User', id: 'LIST' }],
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        const response = await queryFulfilled;
                        dispatch(setUser(response.data));
                    } catch (error) {
                        console.log(error);
                    }
                },
            }),
            refreshToken: builder.mutation({
                query: () => ({
                    url: '/refresh',
                    method: 'GET',
                }),
                transformResponse: (response) => userDto(response),
                // async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                //     try {
                //         const response = await queryFulfilled;
                //         dispatch(setUser(response.data));
                //     } catch (error) {
                //         console.log(error);
                //     }
                // },
            }),
        }),
    })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLogoutMutation, useRegistrationMutation, useRefreshTokenMutation } = authApi;