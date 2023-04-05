import { Tag, Typography } from 'antd';
import moment from 'moment';
import { TbExternalLink } from 'react-icons/tb';
import SetNameButton from './SetNameButton';

const { Text, Link } = Typography;

export const columns: any = () => {
	return [
		{
			title: 'VA Name',
			dataIndex: 'virtualAssistantName',
			key: 'virtualAssistantName',
			width: 250,
			render: (name: any, row: any) => {
				return <SetNameButton {...row} />;
			},
		},
		{
			title: 'Raw Video',
			dataIndex: 'rawVideoLocation',
			key: 'rawVideoLocation',
			render: (link: any, row: any) => (
				<div style={{ minWidth: 20 }}>
					<Link strong ellipsis href={link} target='_blank'>
						<TbExternalLink /> {row.fileName}
					</Link>
				</div>
			),
		},
		{
			title: 'Rendered Video',
			dataIndex: 'renderedVideoLocation',
			key: 'renderedVideoLocation',
			render: (link: any, row: any) => (
				<div style={{ minWidth: 20 }}>
					{(!link && row?.status?.overallProgress > 0 && row?.status?.overallProgress < 1 && (
						<Tag color='orange'>
							<span style={{ fontWeight: 'bold' }}>
								{Number(row.status.overallProgress * 100).toFixed(2)}
							</span>{' '}
							%
						</Tag>
					)) ||
						null}
					{(link && (
						<Link strong ellipsis href={link} target='_blank'>
							<TbExternalLink />
						</Link>
					)) ||
						null}
				</div>
			),
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
