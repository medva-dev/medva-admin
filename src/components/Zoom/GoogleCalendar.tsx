import { useEffect, useState } from 'react';
import { Alert, Button, Divider } from 'antd';
import Title from '../Title';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';

const title = 'Google Calendar';
const items = [title, 'Google Calendar'];

export default function GoogleCalendar() {
	const { loading, fetch, ErrorMessageAlert } = useRequest(request);
	const { loading: checking, fetch: checkStatus } = useRequest(request);
	const [synced, setSynced] = useState<boolean>(false);
	const initiate = async () => {
		const response = await fetch({
			path: 'zoom/google-initiate-calendar',
		});

		if (response.url) {
			window.location.href = response.url;
		}
	};

	useEffect(() => {
		void checkStatus({
			path: 'zoom/google-calendar-check-status',
		}).then((response) => {
			if (response?.synced === true) {
				setSynced(true);
			}
		});
	}, []);

	return (
		<>
			<Title title={title} items={items} />
			<Divider />
			{ErrorMessageAlert}
			{(synced && <Alert type='success' message='Your Google Calendar is synced' />) || (
				<Button danger type='primary' onClick={initiate} loading={loading || checking}>
					Sync Google Calendar
				</Button>
			)}
		</>
	);
}
