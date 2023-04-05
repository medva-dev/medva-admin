import type { IProject } from '../Projects/types';

export interface ITask {
	id: string;
	name: string;
}

export interface IClient {
	id: string;
	name: string;
}

export interface IUser {
	id: string;
	employeeId: string;
	name: string;
	email: string;
	role: string;
	hiredAt: string;
	active: boolean;
	projects?: IProject[];
}
