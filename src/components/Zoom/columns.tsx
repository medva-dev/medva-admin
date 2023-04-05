import { Tag, Typography } from 'antd';
import moment from 'moment';
import Switcher from '../Reusable/Switcher';

const { Text, Link } = Typography;

export const columns: any = () => {
	return [
		{
			title: 'Name',
			dataIndex: 'displayName',
			key: 'displayName',
			width: 250,
			render: (name: any) => {
				return <Text ellipsis>{name}</Text>;
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
			title: 'Department',
			dataIndex: 'department',
			key: 'department',
			render: (value: string) => <Tag color='success'>{value}</Tag>,
		},
		{
			title: 'Created at',
			dataIndex: 'zoomCreatedAt',
			key: 'zoomCreatedAt',
			render: (date: any) => (
				<div style={{ minWidth: 150 }}>
					<Text>{moment(date).format('lll')}</Text>
				</div>
			),
		},
		{
			title: 'Receive Client Bookings',
			dataIndex: 'canAcceptBookings',
			key: 'canAcceptBookings',
			width: 100,
			render: (value: boolean, row: any) => {
				return (
					<div style={{ minWidth: 160 }}>
						<Switcher
							path='zoom/toggle-accept-bookings'
							values={{ id: row.id }}
							defaultValue={value}
						/>
					</div>
				);
			},
		},
	];
};
