import { Row, Col, Card } from 'antd';
import Fader from '../Fader';
import Logo from './Logo';
import LoginForm from './LoginForm';

function Login() {
	return (
		<Row justify='center' align='middle' style={{ height: '100vh' }}>
			<Col span={24}>
				<Fader>
					<Card
						style={{
							width: '90%',
							maxWidth: 350,
							margin: '0 auto',
							marginTop: '-200px',
							padding: 20,
						}}>
						<Logo />
						<LoginForm />
					</Card>
				</Fader>
			</Col>
		</Row>
	);
}

export default Login;
