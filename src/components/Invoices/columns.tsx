import { Button, Tag, Typography } from 'antd';
import { TbDownload, TbExternalLink } from 'react-icons/tb';
import md5 from 'md5';
import { formatter } from '../../helpers/utils';
import store from '../../redux/store';
import { setInvoiceId } from '../../redux/slices/invoices';
import { API_URL } from '../../const/defaults';

const { Text, Link } = Typography;

const statusColors: Record<string, string> = {
	paid: 'green',
	unpaid: 'red',
};

export const columns: any = () => {
	return [
		{
			title: 'Actions',
			dataIndex: 'id',
			key: 'id',
			width: 50,
			fixed: 'left',
			render: (id: number) => {
				const url = new URL(`invoices/download?id=${id}&hash=${md5(String(id))}`, API_URL).href;
				return (
					<div style={{ minWidth: 64, maxWidth: 32, textAlign: 'center' }}>
						<Button
							icon={<TbExternalLink />}
							type='link'
							onClick={() => {
								store.dispatch(setInvoiceId(id));
							}}
						/>

						<Link href={url} target='_blank'>
							<TbDownload />
						</Link>
					</div>
				);
			},
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 80,
			render: (status: any) => {
				return <Tag color={statusColors[status]}>{status}</Tag>;
			},
		},
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 100,
			render: (id: any) => {
				return <Tag>{String(id).padStart(6, '0')}</Tag>;
			},
		},
		{
			title: 'Project name',
			dataIndex: 'project',
			key: 'project',
			render: (project: any) => (
				<div style={{ minWidth: 150 }}>
					<Link strong ellipsis>
						{project?.name}
					</Link>
				</div>
			),
		},
		{
			title: 'Client name',
			dataIndex: 'projectClient',
			key: 'projectClient',
			render: ({ clients }: any) => (
				<div style={{ minWidth: 150 }}>
					<Text strong ellipsis>
						{clients?.name}
					</Text>
				</div>
			),
		},

		{
			title: 'Items',
			dataIndex: 'invoiceItems',
			key: 'invoiceItems',
			render: (items: any) => <Tag color='blue'>{items?.length}</Tag>,
		},
		{
			title: 'Amount due',
			dataIndex: 'total',
			key: 'total',
			render: (total: any) => (
				<div style={{ minWidth: 100 }}>
					<Text strong style={{ fontSize: '1.05em' }}>
						{formatter.from(total)?.toString()}
					</Text>
				</div>
			),
		},
	];
};
