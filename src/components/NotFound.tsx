import { Empty } from 'antd';
import type { CSSProperties } from 'react';
import Fader from './Fader';

interface INotFound {
	message?: string;
	style?: CSSProperties;
}

function NotFound({ message, style }: INotFound) {
	return (
		<Fader>
			<Empty description={message ?? 'No content found'} style={style} />
		</Fader>
	);
}

export default NotFound;
