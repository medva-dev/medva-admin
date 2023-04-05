import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'clients',
	initialState: {
		clientId: null,
		search: undefined,
		refresh: 0,
	},
	reducers: {
		setClientId: (state, action) => {
			state.clientId = action.payload;
		},
		setSearch: (state, action) => {
			state.search = action.payload;
		},
		setRefresh: (state) => {
			state.refresh++;
		},
	},
});

export const { setClientId, setSearch } = slice.actions;

export const selectClientId = (state) => state.clients.clientId;
export const selectSearch = (state) => state.clients.search;
export const selectRefresh = (state) => state.clients.refresh;

export default slice.reducer;
