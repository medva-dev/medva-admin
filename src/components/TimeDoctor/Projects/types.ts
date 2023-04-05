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
	name: string;
}

export interface IProjectUsers {
	tdUsers: IUser;
}

export interface IProject {
	key: string;
	id: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
	tdTasks: ITask[];
	clients?: IClient;
	tdProjectUsers: IProjectUsers[];
}
