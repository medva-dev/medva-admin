import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/logo.png';
import icon from '../../assets/images/icon.png';
import Fader from '../Fader';
import APP_PATHS from '../../const/appPaths';
import { selectCollapsed } from '../../redux/slices/user';
import Menus from './Menus';

const { Header } = Layout;
function SidebarContent() {
	const collapsed = useSelector(selectCollapsed);

	return (
		<>
			<Fader>
				<Link to={APP_PATHS.dashboard}>
					<Header
						style={{
							padding: 0,
							height: 60,
							backgroundColor: '#fcfcfc',
							textAlign: 'center',
							boxShadow: '0px 0px 6px rgb(0,0,0,0.1)',
						}}>
						<img alt='Logo' src={collapsed ? icon : logo} style={{ height: 30, marginTop: 15 }} />
					</Header>
				</Link>
			</Fader>
			<Menus />
		</>
	);
}

export default SidebarContent;
