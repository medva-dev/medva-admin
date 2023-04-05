import React from 'react';
import {
	TbClock,
	TbFileInvoice,
	TbLogout,
	TbBrandZoom,
	TbMessageCircle2,
	TbUserCircle,
	TbVideo,
	TbUser,
} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Badge, Menu, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { MenuProps } from 'antd';

import Fader from '../Fader';
import { selectShowMobileSideBar, setShowMobileSideBar } from '../../redux/slices/user';
import { selectRefresh } from '../../redux/slices/support';
import { post } from '../../services/api';
import { MESSAGES_CONFIG } from '../../const/appPaths';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
	label: React.ReactNode;
	id: string | number;
}

const MenuWithBadge = ({ label, id }: Props) => {
	const refresh = useSelector(selectRefresh);
	const [count, setCount] = React.useState<number>(0);

	const refreshCount = async () => {
		const result = await post(MESSAGES_CONFIG.unread);
		const { data = [] } = result ?? {};
		let c = 0;
		data?.forEach((d: any) => {
			c += Number(d.unreadCount ?? 0) || 0;
		});
		setCount(c);
	};

	React.useEffect(() => {
		if (id !== 'support') {
			return;
		}

		void refreshCount();
	}, [refresh]);

	return (
		<Space>
			{label}
			<Badge count={count} style={{ marginTop: -2 }} />
		</Space>
	);
};

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	return {
		key,
		icon,
		children,
		label: <MenuWithBadge label={label} id={key} />,
		type,
	} as MenuItem;
}

const items: MenuProps['items'] = [
	getItem('Virtual Assistants', 'virtual-assistants', <TbUser />),
	getItem('Clients', 'clients', <TbUserCircle />),
	getItem('Invoices', 'invoices', <TbFileInvoice />, [
		getItem('All', 'invoices/all'),
		getItem('Paid', 'invoices/paid'),
		getItem('Unpaid', 'invoices/unpaid'),
	]),
	getItem('Time Doctor', 'timedoctor', <TbClock />, [
		getItem('Projects', 'timedoctor/projects'),
		getItem('Users', 'timedoctor/users'),
	]),
	getItem('Videos', 'videos', <TbVideo />),
	getItem('Support', 'support', <TbMessageCircle2 />),
	getItem('Zoom', 'zoom', <TbBrandZoom />, [
		getItem('Meetings', 'zoom/meetings'),
		getItem('Users', 'zoom/users'),
		getItem('Google Calendar', 'zoom/google-calendar'),
	]),
	getItem('Logout', 'logout', <TbLogout />),
];

export default function Menus() {
	const showMobileSideBar = useSelector(selectShowMobileSideBar);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onClick: MenuProps['onClick'] = ({ key }) => {
		navigate(key);
		if (showMobileSideBar) {
			dispatch(setShowMobileSideBar(false));
		}
	};

	return (
		<Fader>
			<Menu
				onClick={onClick}
				defaultSelectedKeys={['clients']}
				defaultOpenKeys={['sub1']}
				mode='inline'
				items={items}
				style={{ width: '100%' }}
			/>
		</Fader>
	);
}
