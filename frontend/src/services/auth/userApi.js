import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '@/api/routes.js';
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
        reducerPath: 'userApi',
        baseQuery: fetchBaseQuery({
            baseUrl: api.baseApiPath()
        }),
        entityTypes: ["User"],
        endpoints: (builder) => ({
            userLogin: builder.mutation({
                query: (body) => ({
                    url: `/login`,
                    method: 'POST',
                    body,
                }),
                invalidates: ["User"]
            }),
        }),
    })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserLoginMutation } = userApi;