import { createSlice } from '@reduxjs/toolkit';

const getSession = () => {
	const session = localStorage.getItem('session');
	let user;

	if (session) {
		try {
			user = JSON.parse(session);
		} catch (e) {
			user = undefined;
		}
	}

	return user;
};

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		session: getSession(),
		collapsed: false,
		hideSideBar: false,
		showMobileSideBar: false,
	},
	reducers: {
		setSession: (state, action) => {
			state.session = action.payload;
			localStorage.setItem('session', JSON.stringify(state.session));
		},
		setCollapsed: (state, action) => {
			state.collapsed = action.payload;
		},
		setHideSideBar: (state, action) => {
			state.hideSideBar = action.payload;
		},
		setShowMobileSideBar: (state, action) => {
			state.showMobileSideBar = action.payload;
		},
	},
});

export const { setSession, setCollapsed, setHideSideBar, setShowMobileSideBar } = userSlice.actions;
export const selectSession = (state) => state.user.session;
export const selectCollapsed = (state) => state.user.collapsed;
export const selectHideSideBar = (state) => state.user.hideSideBar;
export const selectShowMobileSideBar = (state) => state.user.showMobileSideBar;

export default userSlice.reducer;
