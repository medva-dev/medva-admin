import Link from 'antd/es/typography/Link';
import { Space, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserProject } from '../../../redux/slices/project';
import type { IProject } from './types';

interface Props {
	project: IProject;
}

export default function AssignedUsers({ project }: Props) {
	const dispatch = useDispatch();
	const { tdProjectUsers = [] } = project;

	const showUserProject = () => {
		dispatch(setUserProject(project));
	};

	if (tdProjectUsers.length < 1) {
		return <Link onClick={showUserProject}>Assign a user</Link>;
	}

	return (
		<Space size={0}>
			{tdProjectUsers.map(({ tdUsers }, index) => {
				if (index >= 3) {
					return null;
				}
				return (
					<Tag color='green' key={index} style={{ cursor: 'pointer' }} onClick={showUserProject}>
						{tdUsers.name}
					</Tag>
				);
			})}
			{(tdProjectUsers.length > 3 && (
				<Tag style={{ cursor: 'pointer' }} onClick={showUserProject}>
					+{tdProjectUsers.length - 3} more
				</Tag>
			)) ||
				null}
		</Space>
	);
}
