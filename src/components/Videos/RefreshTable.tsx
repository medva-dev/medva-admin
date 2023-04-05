import { Button } from 'antd';
import { TbRefresh } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../../redux/slices/videos';

export default function RefreshTable() {
	const dispatch = useDispatch();

	const refresh = () => {
		dispatch(setRefresh());
	};

	return <Button type='ghost' icon={<TbRefresh />} onClick={refresh} />;
}
