import { Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import { useDispatch } from 'react-redux';

import { setClientProject } from '../../../redux/slices/project';
import type { IProject } from './types';

const { Text } = Typography;

interface Props {
	project: IProject;
}

export default function Client({ project }: Props) {
	const dispatch = useDispatch();

	const showDrawer = () => {
		dispatch(setClientProject(project));
	};

	const { clients } = project ?? {};

	if (clients?.name) {
		return <Text strong>{project?.clients?.name}</Text>;
	}

	return (
		<div style={{ minWidth: 150 }}>
			<Link onClick={showDrawer}>Assign to client</Link>
		</div>
	);
}
