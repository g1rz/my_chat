import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice.js';
import userReducer from './slices/userSlice.js';
import {authApi} from '@/redux/api/authApi.js';
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		chat: chatReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch)