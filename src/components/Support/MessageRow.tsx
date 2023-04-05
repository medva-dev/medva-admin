import moment from 'moment';
import { Avatar, Badge, Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientId, setClientId } from '../../redux/slices/support';

const { Text } = Typography;

export default function MessageRow(props: any) {
	const { clientId } = props ?? {};
	const dispatch = useDispatch();
	const selected = useSelector(selectClientId) === clientId;

	const changeClient = () => {
		dispatch(setClientId(clientId));
	};

	const time = moment(props.latestUpdate).format('hh:mm a');
	return (
		<div
			className={`message-row ${selected ? 'active' : ''}`}
			key={props.clientId}
			style={{
				borderBottom: '1px solid rgb(0,0,0,0.1)',
				padding: 20,
				paddingLeft: 15,
				cursor: 'pointer',
				userSelect: 'none',
			}}
			onClick={changeClient}>
			<Row>
				<Col span={24}>
					<table style={{ width: '100%' }}>
						<tr>
							<td style={{ width: 50 }}>
								<Avatar size={40} src={props.avatarUrl}>
									{props.clientName}
								</Avatar>
							</td>
							<td style={{ paddingLeft: 5, maxWidth: 150 }}>
								<Row>
									<Col span={24}>
										<Text ellipsis strong={props.unreadCount > 0}>
											{props.clientName}
										</Text>
									</Col>
									<Col span={24}>
										<Text ellipsis type='secondary'>
											{props.latestMessage}
										</Text>
									</Col>
								</Row>
							</td>
							<td style={{ minWidth: 80, textAlign: 'right' }}>
								<div>
									<Text strong={props.unreadCount > 0}>{time}</Text>
								</div>
								<div>
									<Badge count={props.unreadCount ?? 0} />
								</div>
							</td>
						</tr>
					</table>
				</Col>
			</Row>
		</div>
	);
}
