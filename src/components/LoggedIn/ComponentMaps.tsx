type Record<K extends keyof any, T> = {
	[P in K]: T;
};

const object: Record<string, string> = {
	clients: 'Clients',
	dashboard: 'Dashboard',
	'timedoctor/projects': 'TimeDoctor/Projects',
	'timedoctor/groups': 'TimeDoctor/Groups',
	'timedoctor/users': 'TimeDoctor/Users',
	'invoices/all': 'Invoices/All',
	'invoices/paid': 'Invoices/Paid',
	'invoices/unpaid': 'Invoices/Unpaid',
	'zoom/users': 'Zoom/Users',
	'zoom/google-calendar': 'Zoom/GoogleCalendar',
	'zoom/meetings': 'Zoom/Meetings',
	'virtual-assistants': 'VirtualAssistants/List',
	videos: 'Videos/List',
	support: 'Support',
	logout: 'Logout',
};

export default object;
