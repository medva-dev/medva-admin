import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'support',
	initialState: {
		clientId: null,
		messages: [],
		refresh: 0,
	},
	reducers: {
		setClientId: (state, action) => {
			state.clientId = action.payload;
		},
		setMessages: (state, action) => {
			state.messages = action.payload;
		},
		insertMessage: (state, action) => {
			state.messages.push(action.payload);
		},
		setRefresh: (state) => {
			state.refresh += 1;
		},
	},
});

export const { setClientId, setMessages, insertMessage, setRefresh } = slice.actions;

export const selectClientId = (state) => state.support.clientId;
export const selectMessages = (state) => state.support.messages;
export const selectRefresh = (state) => state.support.refresh;

export default slice.reducer;
