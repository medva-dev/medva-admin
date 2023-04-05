import { Breadcrumb, Typography } from 'antd';
import Fader from './Fader';

interface Props {
	title: string;
	items: string[];
}

export default function Title({ title, items }: Props) {
	return (
		<Fader>
			<div style={{ marginTop: -40 }}>
				<Typography.Title level={3}>{title}</Typography.Title>
				<Breadcrumb>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					{items.map((item) => {
						return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
					})}
				</Breadcrumb>
			</div>
		</Fader>
	);
}
