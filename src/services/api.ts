import axios from 'axios';
import store from '../redux/store';

import { API_URL } from '../const/defaults';

export const logout = () => {
	localStorage.clear();
	window.location.href = '/login';
};

export const getHeaders = () => {
	const headers = { authorization: undefined } as any;
	const token = store.getState().user?.session?.access_token;

	if (token) {
		headers.authorization = `Bearer ${token}`;
	}

	return headers;
};

export const post = async (path = '', data = {}, options = { method: 'POST' }) => {
	const request = {
		method: options?.method || 'POST',
		url: new URL(path, API_URL).href,
		data,
		headers: getHeaders(),
	};

	try {
		const result = (await axios(request))?.data;
		return result;
	} catch (e: any) {
		if (e?.response?.data?.logout) {
			logout();
			return;
		}
		throw new Error(e?.response?.data?.message || e.message);
	}
};

export const request = async ({ path = '', data = {}, options = {} }) => {
	const result = await post(path, data, options as any);
	return result;
};
