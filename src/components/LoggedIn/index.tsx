import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { selectSession } from '../../redux/slices/user';
import AppPaths from '../../const/appPaths';
import Fader from '../Fader';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;
function User() {
	const session = useSelector(selectSession);
	const [marginLeft] = React.useState<number>(0);

	if (!session?.id) {
		return <Navigate to={AppPaths.login} />;
	}

	return (
		<Layout style={{ height: '100vh' }}>
			<Header />
			<Sidebar />
			<Layout
				className='headerAndContent'
				style={{
					marginLeft,
				}}>
				<Content style={{ margin: '40px 30px 0', overflow: 'initial' }}>
					<Fader>
						<Outlet />
					</Fader>
				</Content>
			</Layout>
		</Layout>
	);
}

export default User;
