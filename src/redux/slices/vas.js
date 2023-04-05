import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'vas',
	initialState: {
		selectedVa: null,
		refresh: 0,
	},
	reducers: {
		setSelectedVa: (state, action) => {
			state.selectedVa = action.payload;
		},
		setRefresh: (state) => {
			state.refresh++;
		},
	},
});

export const { setSelectedVa, setRefresh } = slice.actions;

export const selectSelectedVa = (state) => state.vas.selectedVa;
export const selectRefresh = (state) => state.vas.refresh;

export default slice.reducer;
