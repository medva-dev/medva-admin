import { useEffect, useState } from 'react';
import { Card, Col, Empty, Grid, Input, Row } from 'antd';
import { useSelector } from 'react-redux';
import Title from '../Title';
import useRequest from '../../hooks/useRequest';
import supabase from '../../services/supabase';
import { selectRefresh } from '../../redux/slices/support';
import MessageRow from './MessageRow';
import MessageBodyWrapper from './MessageBodyWrapper';

const title = 'Support';
const items = [title, 'Messages'];

const fetchMessages = async () => {
	const { data } = await supabase.from('viewMessages').select();
	return data;
};

export default function Support() {
	const refresh = useSelector(selectRefresh);
	const { md } = Grid.useBreakpoint();
	const { fetch, data } = useRequest(fetchMessages);

	const [threads, setThreads] = useState<any>([]);
	const maxWidth = !md ? '100%' : 350;

	useEffect(() => {
		void fetch();
	}, [refresh]);

	useEffect(() => {
		if ((data ?? [])?.length > 0) {
			setThreads(data);
		}
	}, [data]);

	return (
		<>
			<Title title={title} items={items} />
			<Row align='middle' justify='end' style={{ marginTop: 20 }} gutter={[30, 12]}>
				<Col xs={24} sm={24} style={{ verticalAlign: 'top', minHeight: '800px', maxWidth }}>
					<Card
						title={
							<Input.Search
								placeholder='Search messages'
								size='large'
								style={{ marginTop: 20, marginBottom: 20 }}
							/>
						}
						style={{ minHeight: '800px' }}
						bodyStyle={{ padding: 0 }}>
						{threads.map?.((m: any) => (
							<MessageRow {...m} key={m.clientId} />
						))}
						{threads.length < 1 ? (
							<Empty description='No data yet' style={{ marginTop: 50 }} />
						) : null}
					</Card>
				</Col>
				<Col flex='auto' style={{ minHeight: 800 }}>
					<MessageBodyWrapper />
				</Col>
			</Row>
		</>
	);
}
