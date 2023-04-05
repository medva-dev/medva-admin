import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Grid } from 'antd';

import Fader from '../Fader';
import {
	selectCollapsed,
	selectHideSideBar,
	setCollapsed,
	setHideSideBar,
} from '../../redux/slices/user';
import SidebarContent from './SidebarContent';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

function Sidebar() {
	const collapsed = useSelector(selectCollapsed);
	const hideSideBar = useSelector(selectHideSideBar);

	const dispatch = useDispatch();

	const { lg, xl, sm } = useBreakpoint();

	const toggleCollapse = (status: boolean) => {
		dispatch(setCollapsed(status));
	};

	const toggleHideSideBar = (status: boolean) => {
		dispatch(setHideSideBar(status));
	};

	React.useEffect(() => {
		if (!xl) {
			toggleCollapse(true);
		} else {
			toggleCollapse(false);
		}
	}, [xl]);

	React.useEffect(() => {
		if (!lg) {
			toggleHideSideBar(true);
		} else {
			toggleHideSideBar(false);
		}
	}, [lg]);

	React.useEffect(() => {
		if (!sm) {
			// contentState.hideName = true;
		} else {
			// contentState.hideName = false;
		}
	}, [sm]);

	if (hideSideBar) {
		return <span />;
	}

	return (
		<Fader>
			<Sider
				collapsed={collapsed}
				collapsible
				onCollapse={toggleCollapse}
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
					top: 0,
					bottom: 0,
					backgroundColor: '#fff',
				}}
				width={250}>
				<SidebarContent />
			</Sider>
		</Fader>
	);
}

export default Sidebar;
