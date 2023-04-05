import { useEffect } from 'react';
import { Col, Row, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import Fader from '../Fader';
import { setSession } from '../../redux/slices/user';

export default function Logout() {
	const dispatch = useDispatch();
	useEffect(() => {
		// TODO: invalidate session in the server
		dispatch(setSession(null));
	}, []);

	return (
		<Fader>
			<Row align='middle' justify='center'>
				<Col>
					<Spin size='large' />
				</Col>
			</Row>
		</Fader>
	);
}
