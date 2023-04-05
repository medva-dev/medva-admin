import { useEffect } from 'react';
import moment from 'moment';
import { Card, Divider, Drawer, Space, Table, Typography } from 'antd';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { INVOICES_CONFIG } from '../../const/appPaths';
const { Text } = Typography;

export default function ItemsDrawer({ showDetails, setShowDetails }: any) {
	const { loading, data, fetch } = useRequest(request);

	useEffect(() => {
		if (showDetails > 0) {
			void fetch({ path: INVOICES_CONFIG.itemDetails, data: { id: showDetails } });
		}
	}, [showDetails]);

	const projectName = data?.[0]?.timesheets?.tdProjects?.name ?? '';
	const userName = data?.[0]?.timesheets?.tdUsers?.name ?? '';

	return (
		<Drawer
			destroyOnClose
			title={userName}
			open={showDetails > 0}
			onClose={() => {
				setShowDetails(0);
			}}>
			{(loading && <Card loading />) || (
				<Space direction='vertical'>
					<Text type='secondary'>Project name</Text>
					<Text strong>{projectName}</Text>
				</Space>
			)}
			<Divider />
			<Table
				loading={loading}
				columns={[
					{
						title: 'Date',
						key: 'date',
						dataIndex: 'date',
						render: (_, row) => {
							const { timesheets = {} } = row ?? {};
							const { date } = timesheets ?? {};

							return <Text>{moment(date).format('MMM DD, YYYY')}</Text>;
						},
					},
					{
						title: 'Hours',
						key: 'hours',
						dataIndex: 'hours',
						render: (_, row) => {
							const { timesheets = {} } = row ?? {};
							const { approvedHours } = timesheets ?? {};

							return <Text strong>{approvedHours}</Text>;
						},
					},
				]}
				dataSource={data ?? []}
				pagination={{
					hideOnSinglePage: true,
					pageSize: 999,
				}}></Table>
		</Drawer>
	);
}
