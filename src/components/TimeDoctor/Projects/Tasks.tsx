import { Space, Tag, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { setProject } from '../../../redux/slices/project';

import type { IProject } from './types';

interface Props {
	row: IProject;
}

const { Link } = Typography;

export default function Tasks({ row }: Props) {
	const dispatch = useDispatch();

	const newTask = () => {
		dispatch(setProject(row));
	};

	return (
		<Space size={2}>
			{row.tdTasks?.length < 1 ? (
				<Link onClick={newTask}>Create task</Link>
			) : (
				row.tdTasks?.map?.((task) => {
					return (
						<Tag color='blue' key={task.name} style={{ cursor: 'pointer' }} onClick={newTask}>
							{task.name}
						</Tag>
					);
				})
			)}
		</Space>
	);
}
