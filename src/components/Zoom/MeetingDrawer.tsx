import { Col, Drawer, Row, Space, Typography } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectMeeting, setMeeting } from '../../redux/slices/meetings';
const { Text, Link } = Typography;

export default function MeetingDrawer() {
	const meeting = useSelector(selectMeeting);
	const dispatch = useDispatch();

	const onClose = () => {
		dispatch(setMeeting(null));
	};

	return (
		<Drawer closable open={!!meeting} onClose={onClose} title={'Meeting Details'}>
			<Row gutter={[12, 24]}>
				<Col span={5}>
					<Text>Client</Text>
				</Col>
				<Col span={19}>
					<Text ellipsis strong>
						{meeting?.client}
					</Text>
				</Col>
				<Col span={5}>
					<Text>VA</Text>
				</Col>
				<Col span={19}>
					<Text ellipsis strong>
						{meeting?.va}
					</Text>
				</Col>
				<Col span={5}>
					<Text>Topic</Text>
				</Col>
				<Col span={19}>
					<Text ellipsis strong>
						{meeting?.topic}
					</Text>
				</Col>
				<Col span={5}>
					<Text>Date</Text>
				</Col>
				<Col span={19}>
					<Text ellipsis strong>
						{moment(meeting?.startTime).format('llll')}
					</Text>
				</Col>
				<Col span={5}>
					<Text>Zoom ID</Text>
				</Col>
				<Col span={19}>
					<Text ellipsis strong>
						{meeting?.id}
					</Text>
				</Col>

				<Col span={5}>
					<Text>Link</Text>
				</Col>
				<Col span={19}>
					<Link ellipsis strong href={meeting?.joinUrl} target='_blank'>
						Open meeting link
					</Link>
				</Col>
			</Row>
		</Drawer>
	);
}
