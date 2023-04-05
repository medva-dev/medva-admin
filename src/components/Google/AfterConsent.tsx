import { Card, Col, Row, Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Login/Logo';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import AppPaths from '../../const/appPaths';

export default function AfterConsent() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const navigate = useNavigate();
	const { fetch, ErrorMessageAlert } = useRequest(request, {
		alertIcon: false,
	});

	useEffect(() => {
		const code = urlParams.get('code');

		if (!code) {
			navigate('/');
			return;
		}

		void fetch({
			path: 'zoom/google-consent-verify',
			data: { code },
		}).then((result) => {
			if (result?.successMessage) {
				navigate(AppPaths.zoomGoogleCalendar);
			} else {
				setTimeout(() => {
					navigate('/');
				}, 2000);
			}
		});
	}, []);

	return (
		<Row align='middle' justify='center' style={{ marginTop: 50 }}>
			<Col span={24} style={{ textAlign: 'center' }}>
				<Card style={{ maxWidth: 350, margin: 'auto' }}>
					<Logo />
					<br />
					<Space direction='vertical'>
						{<Spin size='large' />}
						{ErrorMessageAlert}
					</Space>
				</Card>
			</Col>
		</Row>
	);
}
