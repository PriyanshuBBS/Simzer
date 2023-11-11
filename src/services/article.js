import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// RAPID API at 43:00 in video

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',

    // which api to call
    baseQuery: fetchBaseQuery({
        // copy basseURl and header from API's Snippet at RapidAPI
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // put the /summarize end point (got from RapidAPi)
            // encodeURIComponent() function encodes special characters that may be present in the parameter values
            // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    })
});

// uselazyGetSummaryQuery fires the hook when we click not before (ref to Redux for more info)
export const { useLazyGetSummaryQuery } = articleApi