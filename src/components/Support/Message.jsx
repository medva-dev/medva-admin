/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Fader from '../Fader';

export default function Message(props) {
	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	// if userId is null, means that the sender is the clientId
	const { message, createdAt, userId } = props;
	const [showTime, setShowTime] = useState(false);
	const time = moment(createdAt)?.format?.('MMM DD, YYYY hh:mm a');
	const me = !!userId;

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		// eslint-disable-next-line react/no-unknown-property
		<div align={me ? 'right' : 'left'}>
			<div
				// eslint-disable-next-line react/no-unknown-property
				align='left'
				style={{
					display: 'inline-block',
					border: me ? undefined : '1px solid rgb(0,0,0,0.1)',
					borderRadius: 10,
					padding: 10,
					maxWidth: 180,
					backgroundColor: me ? '#4d5fcb' : undefined,
					color: me ? '#fff' : undefined,
				}}
				onClick={() => {
					setShowTime(!showTime);
					setTimeout(scrollToBottom, 200);
				}}>
				{message}
			</div>
			{(showTime && time && (
				<Fader>
					<div
						style={{
							fontSize: 10,
							color: 'rgb(0,0,0,0.5)',
							marginLeft: me ? 0 : 10,
							marginRight: me ? 10 : 0,
						}}>
						{time}
					</div>
				</Fader>
			)) ||
				null}
			<div ref={messagesEndRef} />
		</div>
	);
}
