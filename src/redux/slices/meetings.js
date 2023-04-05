import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'meetings',
	initialState: {
		meeting: null,
	},
	reducers: {
		setMeeting: (state, action) => {
			state.meeting = action.payload;
		},
	},
});

export const { setMeeting } = slice.actions;

export const selectMeeting = (state) => state.meetings.meeting;

export default slice.reducer;
