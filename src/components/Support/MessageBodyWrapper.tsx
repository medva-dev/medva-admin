import { useEffect } from 'react';
import { Avatar, Card, Divider, Empty, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useRequest from '../../hooks/useRequest';
import supabase from '../../services/supabase';
import {
	insertMessage,
	selectClientId,
	selectMessages,
	setMessages,
	setRefresh,
} from '../../redux/slices/support';
import Message from './Message';
import CreateMessage from './CreateMessage';

const { Text } = Typography;

const fetchMessages = async (values: any) => {
	const { clientId } = values ?? {};

	if (!clientId) {
		return undefined;
	}
	const { data: messages } = await supabase
		.from('messages')
		.select()
		.eq('clientId', clientId)
		.order('createdAt', { ascending: true });

	const { data: client } = await supabase.from('clients').select().eq('id', clientId).maybeSingle();

	return { messages, client };
};

const markAsSeen = async (clientId: string) => {
	await supabase.rpc('mark_message_as_seen', { clientId });
};

const style = {
	display: 'flex',
	justifyContent: 'flex-end',
	flexDirection: 'column',
};

export default function MessageBodyWrapper() {
	const clientId = useSelector(selectClientId);
	const dispatch = useDispatch();
	const { loading, fetch, data } = useRequest(fetchMessages);
	const messages = useSelector(selectMessages);

	const cardClicked = async () => {
		await markAsSeen(clientId);
		dispatch(setRefresh());
	};

	useEffect(() => {
		if (clientId) {
			void fetch({ clientId });
		}
	}, [clientId]);

	useEffect(() => {
		dispatch(setMessages(data?.messages ?? []));
		if (Number(data?.messages?.length ?? 0) > 0) {
			markAsSeen(clientId ?? '')
				.then(() => {
					dispatch(setRefresh());
				})
				// eslint-disable-next-line no-console
				.catch(console.log);
		}
	}, [data]);

	useEffect(() => {
		const channel = supabase
			.channel('changes')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'messages',
				},
				(payload) => {
					if (payload.new?.clientId === clientId) {
						dispatch(insertMessage(payload.new));
					}
					dispatch(setRefresh());
				},
			)
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, [clientId]);

	const mainStyle = {
		minHeight: clientId ? 745 : 800,
		maxHeight: clientId ? 745 : 800,
		overflow: 'auto',
	};

	if (clientId && messages.length > 0) {
		Object.assign(mainStyle, style);
	}

	const { client = {} } = (data ?? {}) as any;

	return (
		<Card
			bodyStyle={mainStyle}
			onClick={cardClicked}
			title={
				loading ? (
					'Please wait'
				) : client?.name ? (
					<Space>
						<Avatar src={client?.avatarUrl} /> <Text>{client?.name}</Text>
					</Space>
				) : null
			}>
			{(!loading && !clientId && (
				<Empty description='Select a message first' style={{ marginTop: 100 }} />
			)) ||
				null}
			{(loading && <Card loading />) || null}
			{clientId && !loading && (data?.messages ?? []).length < 1 && (
				<Empty style={{ marginTop: 100 }} description='No messages' />
			)}
			<Space direction='vertical' style={{ width: '100%', overflow: 'auto' }}>
				{messages?.map?.((d: any) => {
					return <Message {...d} key={d.id} />;
				})}
			</Space>
			{clientId && !loading && (
				<>
					<Divider />
					<CreateMessage clientId={clientId} />
				</>
			)}
		</Card>
	);
}
