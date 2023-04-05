import { useEffect, useState, useRef } from 'react';
import { Button, Col, Input, Row } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import useRequest from '../../hooks/useRequest';
import supabase from '../../services/supabase';
import store from '../../redux/store';

interface IProps {
	clientId: string;
}

const xSend = async (values: any = {}) => {
	const insert = {
		message: values?.message,
		clientId: values?.clientId,
		userId: values?.userId,
	};

	const { data, error } = await supabase.from('messages').insert(insert);
};

export default function CreateMessage(props: IProps) {
	const userId = store.getState().user.session?.id;

	const { clientId } = props;
	const inputRef = useRef<any>(null);
	const [value, setValue] = useState<string>('');

	const { loading, fetch: sendNow } = useRequest(xSend);

	const keyUp = ({ key }: any) => {
		if (key === 'Enter') {
			void send();
		}
	};

	const send = async () => {
		if (!value?.trim?.()) {
			inputRef?.current?.focus?.();
			return;
		}

		setValue('');
		inputRef?.current?.focus?.();
		await sendNow({ message: value, clientId, userId });
	};

	useEffect(() => {
		setTimeout(() => {
			inputRef.current?.focus?.();
		}, 500);
	}, []);

	return (
		<Row gutter={12}>
			<Col flex='auto'>
				<Input
					placeholder='Enter your message'
					value={value}
					ref={inputRef}
					onKeyUp={keyUp}
					onChange={(event) => {
						setValue(event?.target?.value ?? '');
					}}
				/>
			</Col>
			<Col xs={2} sm={2} md={2} lg={2} xl={1}>
				<Button icon={<SendOutlined />} loading={loading} onClick={send} />
			</Col>
		</Row>
	);
}
