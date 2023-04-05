const AppPaths = {
	main: '/app',
	login: '/login',
	logout: '/logout',
	dashboard: '/app/clients',
	googleAfterLogin: '/google-after-login',
	googleAfterConsent: '/google-after-consent',
	zoomGoogleCalendar: '/app/zoom/google-calendar',
};

export const VIRTUAL_ASSISTANTS_CONFIG = {
	list: 'vas/list',
	updateStatus: 'vas/update-status',
	tableName: 'virtualAssistants',
	defaultOrder: 'id',
};

export const VIDEO_CONFIG = {
	list: 'videos/list',
	upload: 'videos/upload',
	update_name: 'videos/update-name',
	tableName: 'videoUploads',
	defaultOrder: 'createdAt',
};

export const CLIENTS_CONFIG = {
	list: 'clients/list',
	tableName: 'clients',
	defaultOrder: 'createdAt',
	selects: {
		clients: '*',
		tdProjects: 'tdProjects(name)',
		invoices: 'invoices:tdProjects(invoices!inner(status,total))',
	},
};

export const INVOICES_CONFIG = {
	list: 'invoices/list',
	generate: 'invoices/generate',
	lastInvoiceGenerateDate: 'invoices/last-invoice-generate-date',
	details: 'invoices/details',
	itemDetails: 'invoices/item-details',
	tableName: 'invoices',
	defaultOrder: 'createdAt',
	searchOptions: [
		{ value: 'tdProjects.name', label: 'Project name' },
		{ value: 'projectClient.clients.name', label: 'Client name' },
	],
	selects: {
		invoices: '*',
		'tdProjects.name': 'project:tdProjects(name)',
		'projectClient.clients.name': 'projectClient:tdProjects(clients(name))',
		invoiceItems: 'invoiceItems(id)',
	},
};

export const TIMEDOCTOR_CONFIG = {
	list: 'timedoctor/list',
	users: 'timedoctor/users',
	userTable: 'tdUsers',
	tasks: 'timedoctor/tasks',
	createTask: 'timedoctor/create-task',
	assignToClient: 'timedoctor/assign-to-client',
	tableName: 'tdProjects',
	defaultOrder: 'createdAt',
	userSelects: {
		tdUsers: '*',
		'tdProjectUsers.tdProjects.name': 'tdProjectUsers( tdProjects ( name ))',
	},
	selects: {
		tdProjects: '*',
		'tdTasks.name': 'tdTasks(id, name)',
		'clients.name': 'clients(name)',
		'tdProjectUsers.tdUsers.name': 'tdProjectUsers(tdUsers(id,name))',
	},
};

export const MESSAGES_CONFIG = {
	unread: 'messages/unread',
};

export const AUTOCOMPLETE_CONFIG = {
	options: 'autocomplete/options',
};

export default AppPaths;
