import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Empty, Space } from 'antd';
import { selectClientId } from '../../redux/slices/support';
import useRequest from '../../hooks/useRequest';
import Fader from '../Fader';
import supabase from '../../services/supabase';
import Message from './Message';

const fetchMessages = async (values: any) => {
	const { clientId } = values ?? {};

	if (!clientId) {
		return undefined;
	}
	const { data } = await supabase
		.from('messages')
		.select()
		.eq('clientId', clientId)
		.order('createdAt', { ascending: false });

	return data;
};

export default function MessageBody() {
	const clientId = useSelector(selectClientId);
	const { loading, fetch, Alerts, data } = useRequest(fetchMessages);

	useEffect(() => {
		if (clientId) {
			void fetch({ clientId });
		}
	}, [clientId]);

	if (!clientId) {
		return <Empty description='Select a message first' style={{ marginBottom: 400 }} />;
	}

	if (!loading) {
		return (
			<Fader>
				<Card loading />
			</Fader>
		);
	}

	if (!Array.isArray(data) || data.length < 1) {
		return <Empty description='No messages' style={{ marginBottom: 400 }} />;
	}

	return (
		<>
			{Alerts}
			<Space direction='vertical' style={{ width: '100%' }}>
				{data?.map?.((d) => {
					return <Message {...d} key={d.id} />;
				})}
			</Space>
		</>
	);
}
