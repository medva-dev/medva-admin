import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { TbKey, TbMail } from 'react-icons/tb';
import Fader from '../Fader';
import useRequest from '../../hooks/useRequest';
import { setSession } from '../../redux/slices/user';
import AppPaths from '../../const/appPaths';
import { request } from '../../services/api';

const { Title } = Typography;

export default function LoginForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [form] = Form.useForm();
	const { loading, fetch, ErrorMessageAlert, SuccessMessageAlert } = useRequest(request, {
		alertStyle: { marginBottom: 10 },
	});

	const {
		loading: fetchingGoogleUrl,
		fetch: fetchGoogleUrl,
		ErrorMessageAlert: GoogleErrorMessageAlert,
	} = useRequest(request, { alertStyle: { marginBottom: 10 } });

	const onFinish = async (values: ILoginData) => {
		const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions();
		const response = await fetch({ path: 'public/login', data: { ...values, timezone } });
		const { session, user } = response ?? {};
		if (session && user) {
			dispatch(setSession({ ...session, ...user, name: user?.user_metadata?.name }));
			navigate(AppPaths.dashboard);
		}
	};

	const checkSession = async () => {
		try {
			const session = JSON.parse(localStorage.getItem('session') ?? '');
			const { user } = session ?? {};
			if (session && user) {
				dispatch(setSession({ ...session, ...user, name: user?.user_metadata?.name }));
				navigate(AppPaths.dashboard);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const googleLogin = async () => {
		const response = await fetchGoogleUrl({ path: 'public/google-login' });
		if (response.url) {
			window.location.href = response.url;
		}
	};

	useEffect(() => {
		void checkSession();
	}, []);

	return (
		<Form
			form={form}
			wrapperCol={{ span: 24 }}
			initialValues={{}}
			autoComplete='off'
			onFinish={onFinish}>
			<Fader>
				<Row align='middle' justify='center' style={{ padding: 10 }}>
					<Col>
						<Title level={5}>Log in to your account</Title>
					</Col>
				</Row>
				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: 'Please enter your email address!',
						},
					]}>
					<Input
						type='email'
						prefix={<TbMail style={{ color: 'rgb(0,0,0,0.5)' }} />}
						placeholder='Your email address'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{ required: true, message: 'Please enter your password!' },
						{ min: 6, message: 'Must be at least 6 characters' },
						{ max: 20, message: 'Must be at less than 20 characters' },
					]}>
					<Input.Password
						prefix={<TbKey style={{ color: 'rgb(0,0,0,0.5)' }} />}
						placeholder='Your password'
						type='password'
					/>
				</Form.Item>

				<Row gutter={[12, 12]} style={{ marginBottom: 5 }}>
					<Col flex='auto'>
						{ErrorMessageAlert}
						{SuccessMessageAlert}
						{GoogleErrorMessageAlert}
					</Col>
				</Row>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						block
						loading={loading}
						disabled={fetchingGoogleUrl}>
						Log in
					</Button>
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						ghost
						block
						loading={fetchingGoogleUrl}
						disabled={loading}
						onClick={googleLogin}>
						Log in using google
					</Button>
				</Form.Item>
			</Fader>
		</Form>
	);
}
