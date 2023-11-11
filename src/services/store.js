// Why below code is needed? Don't know these are from official redux docs
// What is a store: It is a globol state that store information of entire state

import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";

export const store = configureStore({
    // reducer allows to take a slice
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})