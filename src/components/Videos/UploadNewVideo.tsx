import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { setShowUploadDrawer } from '../../redux/slices/videos';
import UploadDrawer from './UploadDrawer';

export default function RightButtons() {
	const dispatch = useDispatch();

	const showDrawer = () => {
		dispatch(setShowUploadDrawer(true));
	};

	return (
		<>
			<Space>
				<Button type='primary' onClick={showDrawer}>
					Upload new video
				</Button>
			</Space>
			<UploadDrawer />
		</>
	);
}
