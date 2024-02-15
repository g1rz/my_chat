import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiEndpoints} from "@/consts/apiEndpoints.js";

export const baseQuery = fetchBaseQuery({
    baseUrl: apiEndpoints.baseApiPath(),
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const { token } = getState().user;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers;
    },
});