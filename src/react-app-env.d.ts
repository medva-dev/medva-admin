declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
interface ILoginData {
	email: string;
	password: string;
}

type useRequestTService<TParams, TData> = (values: TParams) => Promise<TData>;
interface useRequestIOptions {
	autoStart?: boolean;
	clearErrorMessageOnFetch?: boolean;
	clearSuccessMessageOnFetch?: boolean;
	clearDataOnFetch?: boolean;
	alertStyle?: Record<string, any>;
	alertIcon?: boolean;
	values?: any;
}

interface useRequestIState<TData> {
	loading: boolean;
	errorMessage: string | undefined;
	successMessage: string | undefined;
	data: TData;
}

interface ISession {
	access_token: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
	token_type: string;
}

interface IUser {
	id: string;
	name: string;
	email: string;
	session: ISession;
}

interface ITableRequest {
	path: string;
	table: string;
	order: string;
	desc: boolean;
	selects: Record<string, any>;
	columns: any;
	refreshSelector?: any;
	customValues?: Record<string, any>;
}

interface ITableSelectOption {
	value: string;
	label: string;
}

interface ITableSearchProps {
	defaultSelected: string;
	options: ITableSelectOption[];
	overrideSelects?: Record<string, string>;
	refresh?: React.ReactNode;
	extra?: React.ReactNode;
}
