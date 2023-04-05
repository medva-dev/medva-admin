import { Space, Tag, Typography } from 'antd';

const { Link } = Typography;

const roleColors: Record<string, string> = {
	owner: 'red',
	manager: 'blue',
	admin: 'purple',
	user: 'green',
	guest: 'orange',
};

const statusColors: Record<string, string> = {
	active: 'green',
	inactive: 'red',
};

export const columns: any = () => {
	return [
		{
			title: 'Status',
			dataIndex: 'active',
			key: 'active',
			render: (status: any) => {
				const statusString = status === true ? 'active' : 'inactive';
				return <Tag color={statusColors[statusString]}>{statusString}</Tag>;
			},
		},
		{
			title: 'Name',
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
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Employee ID',
			dataIndex: 'employeeId',
			key: 'employeeId',
			render: (employeeId: any) => (employeeId ? <Tag>{employeeId}</Tag> : null),
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (role: any) => <Tag color={roleColors[role]}>{role}</Tag>,
		},
		{
			title: 'Project',
			dataIndex: 'tdProjectUsers',
			key: 'tdProjectUsers',
			render: (projects: any) => {
				if (Array.isArray(projects) && projects.length > 0) {
					return (
						<div style={{ minWidth: 300 }}>
							<Space>
								{projects.map((project) => (
									<Tag color='blue' key={project?.tdProjects?.name}>
										{project?.tdProjects?.name}
									</Tag>
								))}
							</Space>
						</div>
					);
				}
				return <span />;
			},
		},
	];
};
