import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { setVideoId } from '../../redux/slices/videos';

interface IProps {
	id: number;
	virtualAssistantName: string;
}

export default function SetNameButton(props: IProps) {
	const { virtualAssistantName, id } = props;
	const dispatch = useDispatch();

	const showUpdateNameDrawer = () => {
		dispatch(setVideoId(id));
	};

	if (!virtualAssistantName) {
		return (
			<Button type='link' onClick={showUpdateNameDrawer} style={{ paddingLeft: 0 }}>
				set name
			</Button>
		);
	}

	return <Typography.Text strong>{virtualAssistantName}</Typography.Text>;
}
