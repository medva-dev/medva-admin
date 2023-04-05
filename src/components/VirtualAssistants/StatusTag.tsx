import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { setSelectedVa } from '../../redux/slices/vas';

const statusColors: Record<string, string> = {
	open: 'green',
	booked: 'red',
	hired: 'blue',
	hidden: 'gray',
};

export default function StatusTag(props: any) {
	const dispatch = useDispatch();
	const { status } = props;

	const setVa = () => {
		dispatch(setSelectedVa(props));
	};

	return (
		<div style={{ minWidth: 100 }}>
			<Tag color={statusColors[status]} style={{ cursor: 'pointer' }} onClick={setVa}>
				{status}
			</Tag>
		</div>
	);
}
