import { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Divider,
	Calendar,
	Card,
	Badge,
	Space,
	Typography,
	Row,
	Col,
	Drawer,
} from 'antd';
import { useDispatch } from 'react-redux';
import type { Dayjs } from 'dayjs';
import Title from '../Title';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { setMeeting } from '../../redux/slices/meetings';
import MeetingDrawer from './MeetingDrawer';

const title = 'Zoom Meetings';
const items = [title, 'Zoom Meetings'];

const { Text } = Typography;

export default function Meetings() {
	const dispatch = useDispatch();
	const { loading, fetch, data, ErrorMessageAlert } = useRequest(request, {
		alertStyle: { marginBottom: 20 },
	});

	const dateCellRender = (value: Dayjs) => {
		const meetings = data?.meetings?.[value.format('YYYY-MM-DD')];

		if (!meetings || !Array.isArray(meetings) || meetings.length < 1) {
			return;
		}

		return (
			<ul className='events'>
				{meetings.map((meeting: any) => {
					return (
						<li
							key={meeting.id}
							style={{ width: '100%' }}
							onClick={() => {
								dispatch(setMeeting(meeting));
							}}>
							<div>
								<Text style={{ fontSize: '0.8em' }} ellipsis>
									<Text type='secondary' style={{ fontSize: '0.8em' }}>
										{meeting.time}
									</Text>
									&nbsp;&nbsp;&nbsp;
									{meeting.topic}
								</Text>
							</div>
						</li>
					);
				})}
			</ul>
		);
	};

	useEffect(() => {
		void fetch({ path: 'zoom/meetings' });
	}, []);

	return (
		<>
			<Title title={title} items={items} />
			<Divider />
			{ErrorMessageAlert}
			<Card loading={loading}>
				<Calendar dateCellRender={dateCellRender} />
			</Card>
			<MeetingDrawer />
		</>
	);
}
