import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import project from './slices/project';
import tdUsers from './slices/tdUsers';
import invoices from './slices/invoices';
import clients from './slices/clients';
import support from './slices/support';
import meetings from './slices/meetings';
import videos from './slices/videos';
import vas from './slices/vas';

const store = configureStore({
	reducer: {
		user,
		project,
		tdUsers,
		invoices,
		clients,
		support,
		meetings,
		videos,
		vas,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
