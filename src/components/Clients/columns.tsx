import { Avatar, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import { formatter } from '../../helpers/utils';

const { Text, Link } = Typography;

export const columns: any = () => {
	return [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 250,
			render: (name: any, row: any) => {
				return (
					<Space>
						<Avatar src={row.avatarUrl}>{name?.[0]}</Avatar>
						<Text ellipsis>{name}</Text>
					</Space>
				);
			},
		},
		{
			title: 'Email address',
			dataIndex: 'email',
			key: 'email',
			render: (email: any) => (
				<div style={{ minWidth: 150 }}>
					<Link strong ellipsis>
						{email}
					</Link>
				</div>
			),
		},
		{
			title: 'Projects',
			dataIndex: 'tdProjects',
			key: 'tdProjects',
			render: (projects: any) =>
				projects?.length > 0 ? <Tag color='success'>{projects.length}</Tag> : null,
		},

		{
			title: 'Balance',
			dataIndex: 'invoices',
			key: 'invoices',
			width: 100,
			render: (invoices: any) => {
				if (!Array.isArray(invoices) || invoices.length < 1) {
					return null;
				}
				let bal = 0;
				invoices.forEach((i) => {
					if (Array.isArray(i.invoices)) {
						i.invoices.forEach(({ total, status }: any) => {
							if (status !== 'paid') {
								bal += Number(total ?? 0) || 0;
							}
						});
					}
				});

				return (
					<div style={{ minWidth: 100, fontWeight: 'bold' }}>
						<Tag color={bal > 0 ? 'red' : 'green'}>{formatter.from(bal)?.toString()}</Tag>
					</div>
				);
			},
		},
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (date: any) => (
				<div style={{ minWidth: 150 }}>
					<Text>{moment(date).format('lll')}</Text>
				</div>
			),
		},
	];
};
