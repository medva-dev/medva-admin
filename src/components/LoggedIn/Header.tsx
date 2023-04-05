import { Layout, Affix, Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { TbMenu2 } from 'react-icons/tb';

import Fader from '../Fader';
import {
	selectHideSideBar,
	selectShowMobileSideBar,
	setShowMobileSideBar,
} from '../../redux/slices/user';
import logo from '../../assets/images/logo.png';
import MobileSideBar from './MobileSideBar';

const { Header: AntdHeader } = Layout;

export default function Header() {
	const dispatch = useDispatch();
	const showMobileSideBar = useSelector(selectShowMobileSideBar);
	const hideSideBar = useSelector(selectHideSideBar);

	const toggleMobileSideBar = (status: boolean) => {
		dispatch(setShowMobileSideBar(status));
	};

	const menuButtonClicked = () => {
		toggleMobileSideBar(!showMobileSideBar);
	};

	if (!hideSideBar) {
		return <span />;
	}

	return (
		<>
			<Affix>
				<AntdHeader
					style={{
						backgroundColor: '#fff',
						borderBottom: '0.5px solid rgb(0,0,0,0.1)',
						padding: 0,
						maxHeight: '100px',
					}}>
					<Fader>
						<Row>
							<Col span={20}>
								<img alt='Logo' src={logo} style={{ height: 30, paddingLeft: 20, marginTop: 15 }} />
							</Col>
							<Col span={4} style={{ textAlign: 'right', paddingRight: 20 }}>
								<Button icon={<TbMenu2 />} ghost type='primary' onClick={menuButtonClicked} />
							</Col>
						</Row>
					</Fader>
				</AntdHeader>
			</Affix>
			<MobileSideBar />
		</>
	);
}
