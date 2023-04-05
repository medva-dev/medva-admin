import { Card, Col, Row, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Login/Logo';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { setSession } from '../../redux/slices/user';
import AppPaths from '../../const/appPaths';

export default function AfterLogin() {
	const dispatch = useDispatch();
	const { hash } = useLocation();
	const [hashState, setHashState] = useState<any>(null);

	const navigate = useNavigate();
	const { fetch, ErrorMessageAlert } = useRequest(request, {
		alertIcon: false,
	});

	useEffect(() => {
		if (!hash && !hashState) {
			navigate('/');
			return;
		}

		if (hash) {
			setHashState(hash);
			const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions();

			void fetch({
				path: 'public/google-login-verify',
				data: { hash, timezone },
			}).then((result) => {
				if (result?.session) {
					const { session = {} } = result;
					const { user = {} } = session;
					dispatch(setSession({ ...session, ...user, name: user?.user_metadata?.name }));
					navigate(AppPaths.dashboard);
				} else {
					setTimeout(() => {
						navigate('/');
					}, 2000);
				}
			});
		}
	}, [hash]);

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
