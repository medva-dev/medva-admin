import { createSlice } from '@reduxjs/toolkit';

export const tdUsersSlice = createSlice({
	name: 'tdUsers',
	initialState: {
		refresh: 0,
		search: undefined,
	},
	reducers: {
		setRefresh: (state) => {
			state.refresh++;
		},
		setSearch: (state, action) => {
			state.search = action.payload;
		},
	},
});

export const { setRefresh, setSearch } = tdUsersSlice.actions;

export const selectRefresh = (state) => state.tdUsers.refresh;
export const selectSearch = (state) => state.tdUsers.search;

export default tdUsersSlice.reducer;
