import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice.js';
import userReducer from './slices/userSlice.js';
import {api} from '@/redux/api/api.js';
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		chat: chatReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)