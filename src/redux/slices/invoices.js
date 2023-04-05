import { createSlice } from '@reduxjs/toolkit';

export const invoicesSlice = createSlice({
	name: 'invoices',
	initialState: {
		invoiceId: 0,
		search: undefined,
		refresh: 0,
		generateInvoiceDrawer: false,
	},
	reducers: {
		setInvoiceId: (state, action) => {
			state.invoiceId = action.payload;
		},
		setSearch: (state, action) => {
			state.search = action.payload;
		},
		setRefresh: (state) => {
			state.refresh++;
		},
		setGenerateInvoiceDrawer: (state, action) => {
			state.generateInvoiceDrawer = action.payload;
		},
	},
});

export const { setInvoiceId, setSearch, setRefresh, setGenerateInvoiceDrawer } =
	invoicesSlice.actions;

export const selectInvoiceId = (state) => state.invoices.invoiceId;
export const selectSearch = (state) => state.invoices.search;
export const selectRefresh = (state) => state.invoices.refresh;
export const selectGenerateInvoiceDrawer = (state) => state.invoices.generateInvoiceDrawer;

export default invoicesSlice.reducer;
