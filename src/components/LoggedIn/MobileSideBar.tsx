import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowMobileSideBar, setShowMobileSideBar } from '../../redux/slices/user';
import logo from '../../assets/images/logo.png';
import Menus from './Menus';

export default function MobileSideBar() {
	const dispatch = useDispatch();
	const open = useSelector(selectShowMobileSideBar);

	const close = () => {
		dispatch(setShowMobileSideBar(false));
	};

	return (
		<Drawer
			open={open}
			closeIcon={false}
			onClose={close}
			placement='left'
			width={300}
			title={<img alt='Logo' src={logo} style={{ height: 30, marginLeft: 30, marginTop: 5 }} />}
			bodyStyle={{ padding: 0 }}>
			<Menus />
		</Drawer>
	);
}
