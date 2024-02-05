import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice.js';
import userReducer from './slices/userSlice.js';

export default configureStore({
	reducer: {
		chat: chatReducer,
		user: userReducer,
	},
});
