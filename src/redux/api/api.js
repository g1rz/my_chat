import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "@/redux/api/baseQueryWithReauth.js";

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User"],
    endpoints: () => ({}),
})
