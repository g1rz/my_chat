import {api} from "@/redux/api/api.js";

export const usersApi = api.injectEndpoints({
   endpoints: (builder) => ({
       users: builder.query({
           query: () => ({
               url: '/users',
               method: 'GET',

           })
       })
   })
});

export const { useUsersQuery, useLazyUsersQuery } = usersApi;