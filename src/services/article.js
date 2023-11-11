import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleApi = createApi({
    reducerPath: 'articleApi',

    // which api to call
    baseQuery: fetchBaseQuery({
        baseUrl:''
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query:(params) => 'test'
        })
    })
});