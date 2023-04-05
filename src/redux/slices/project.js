import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
	name: 'project',
	initialState: {
		refresh: 0,
		project: undefined,
		newProject: false,
		search: undefined,
		clientProject: undefined,
		userProject: undefined,
	},
	reducers: {
		setProject: (state, action) => {
			state.project = action.payload;
		},
		setRefresh: (state) => {
			state.refresh++;
		},
		setNewProject: (state, action) => {
			state.newProject = action.payload;
		},
		setSearch: (state, action) => {
			state.search = action.payload;
		},
		setClientProject: (state, action) => {
			state.clientProject = action.payload;
		},
		setUserProject: (state, action) => {
			state.userProject = action.payload;
		},
	},
});

export const {
	setProject,
	setRefresh,
	setNewProject,
	setSearch,
	setClientProject,
	setUserProject,
} = projectSlice.actions;

export const selectProject = (state) => state.project.project;
export const selectRefresh = (state) => state.project.refresh;
export const selectNewProject = (state) => state.project.newProject;
export const selectSearch = (state) => state.project.search;
export const selectClientProject = (state) => state.project.clientProject;
export const selectUserProject = (state) => state.project.userProject;

export default projectSlice.reducer;
