import { Typography } from 'antd';

import Client from './Client';
import Tasks from './Tasks';
import AssignedUsers from './AssignedUsers';

const { Link } = Typography;

export const columns: any = () => {
	return [
		{
			title: 'Project Name',
			dataIndex: 'name',
			key: 'name',
			render: (name: any) => (
				<div style={{ minWidth: 150 }}>
					<Link strong ellipsis>
						{name}
					</Link>
				</div>
			),
		},
		{
			title: 'Tasks',
			dataIndex: 'tasks',
			key: 'tasks',
			render: (_: any, row: any) => <Tasks row={row} />,
		},
		{
			title: 'Client Name',
			dataIndex: 'clients',
			key: 'clients',
			render: (_: any, row: any) => {
				return <Client project={row} />;
			},
		},
		{
			title: 'Assigned users',
			dataIndex: 'tdProjectUsers',
			key: 'tdProjectUsers',
			render: (_: any, row: any) => {
				return <AssignedUsers project={row} />;
			},
		},
	];
};
