import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
	channels: [],
	messages: [],
	currentChannelId: 0,
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setChannels: (state, action) => {
			state.channels = action.payload;
		},
		setMessages: (state, action) => {
			state.messages = action.payload;
		},
		setCurrentChannelId: (state, action) => {
			state.currentChannelId = action.payload;
		},
	},
});

export const { setChannels, setMessages, setCurrentChannelId } =
	chatSlice.actions;

export default chatSlice.reducer;
