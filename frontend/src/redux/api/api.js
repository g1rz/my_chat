import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {apiEndpoints} from '@/api/routes.js';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiEndpoints.baseApiPath(),
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().user
            console.log(getState())
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ["User"],
    endpoints: () => ({}),
})
