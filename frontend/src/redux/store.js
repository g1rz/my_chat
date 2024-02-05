import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice.js';
import userReducer from './slices/userSlice.js';
import {userApi} from '@/services/auth/userApi.js';
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		chat: chatReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch)