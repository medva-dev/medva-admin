import { Avatar, Typography } from 'antd';
import StatusTag from './StatusTag';

const { Text } = Typography;

export const columns: any = () => {
	return [
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			width: 20,
			render: (avatar: any) => {
				return (
					<div style={{ minWidth: 20 }}>
						<Avatar src={avatar} style={{ border: '1px solid rgb(0,0,0,0.3)' }} />
					</div>
				);
			},
		},
		{
			title: 'First name',
			dataIndex: 'firstName',
			key: 'firstName',
			width: 100,
			render: (name: any) => {
				return (
					<div style={{ minWidth: 100 }}>
						<Text ellipsis>{name}</Text>
					</div>
				);
			},
		},
		{
			title: 'Last name',
			dataIndex: 'lastName',
			key: 'lastName',
			width: 100,
			render: (name: any) => {
				return (
					<div style={{ minWidth: 100 }}>
						<Text ellipsis>{name}</Text>
					</div>
				);
			},
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			width: 100,
			render: (phone: any) => {
				return (
					<div style={{ minWidth: 100 }}>
						<Text ellipsis>{phone}</Text>
					</div>
				);
			},
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 100,
			render: (email: any) => {
				return (
					<div style={{ minWidth: 100 }}>
						<Text ellipsis>{email}</Text>
					</div>
				);
			},
		},
		{
			title: 'MedVA Email',
			dataIndex: 'medvaEmail',
			key: 'medvaEmail',
			width: 100,
			render: (email: any) => {
				return (
					<div style={{ minWidth: 100 }}>
						<Text ellipsis>{email}</Text>
					</div>
				);
			},
		},
		{
			title: 'Province',
			dataIndex: 'province',
			key: 'province',
			width: 100,
			render: (value: any) => {
				return (
					<div style={{ minWidth: 100 }}>
						<Text ellipsis>{value}</Text>
					</div>
				);
			},
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
			width: 100,
			render: (value: any) => {
				return (
					<div style={{ minWidth: 100 }}>
						<Text ellipsis>{value}</Text>
					</div>
				);
			},
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 100,
			render: (value: any, row: any) => <StatusTag {...row} />,
		},
	];
};
