import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'videos',
	initialState: {
		showUploadDrawer: false,
		videoId: 0,
		refresh: 0,
	},
	reducers: {
		setRefresh: (state) => {
			state.refresh++;
		},
		setShowUploadDrawer: (state, action) => {
			state.showUploadDrawer = action.payload;
		},
		setVideoId: (state, action) => {
			state.videoId = action.payload;
		},
	},
});

export const { setShowUploadDrawer, setVideoId, setRefresh } = slice.actions;

export const selectShowUploadDrawer = (state) => state.videos.showUploadDrawer;
export const selectVideoId = (state) => state.videos.videoId;
export const selectRefresh = (state) => state.videos.refresh;

export default slice.reducer;
