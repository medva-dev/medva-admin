/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useState, useEffect, useRef } from 'react';
import { Button, Col, Drawer, Input, Row, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { ColumnsType } from 'antd/es/table';
import type { InputRef } from 'antd';

import useRequest from '../../../hooks/useRequest';

import { selectProject, setProject, setRefresh } from '../../../redux/slices/project';
import { request } from '../../../services/api';
import { TIMEDOCTOR_CONFIG } from '../../../const/appPaths';
import type { IProject, ITask } from './types';

const columns: ColumnsType<ITask> = [
	{
		title: 'Task name',
		dataIndex: 'name',
		key: 'name',
	},
];

export default function TaskDrawer() {
	const project = (useSelector(selectProject) || {}) as IProject;
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const inputRef = useRef<InputRef>(null);
	const { loading, fetch: saveNow, Alerts, clear } = useRequest(request);

	const {
		loading: tasksLoading,
		data = [],
		fetch,
		ErrorMessageAlert: ListErrorMessageAlert,
	} = useRequest(request);

	const close = () => {
		setOpen(false);
		clear();
		setValue('');
		setTimeout(() => {
			dispatch(setProject(null));
		}, 300);
	};

	const createTask = async () => {
		if (!value) {
			inputRef.current?.focus();
			return;
		}

		const req = {
			path: TIMEDOCTOR_CONFIG.createTask,
			data: { name: value, projectId: project.id },
		};

		const { successMessage } = await saveNow(req);

		if (successMessage && inputRef?.current?.input) {
			setValue('');
			void fetch({ path: TIMEDOCTOR_CONFIG.tasks, data: { projectId: project.id } });
			dispatch(setRefresh());
		}
	};

	useEffect(() => {
		if (!project.id) {
			setOpen(false);
		} else {
			void fetch({ path: TIMEDOCTOR_CONFIG.tasks, data: { projectId: project.id } });
			setOpen(true);
		}
	}, [project]);

	return (
		<Drawer
			open={open}
			closable
			onClose={close}
			title={`Tasks - ${project.name}`}
			destroyOnClose
			bodyStyle={{ padding: 0 }}>
			<Space direction='vertical' style={{ width: '100%' }}>
				<Row gutter={[8, 12]} style={{ padding: 20 }}>
					<Col span={14}>
						<Input
							placeholder='New task name'
							ref={inputRef}
							disabled={loading}
							value={value}
							onChange={(event: any) => {
								const newValue = event?.target?.value;
								setValue(newValue || '');
								clear();
							}}
						/>
					</Col>
					<Col span={10}>
						<Button type='primary' block onClick={createTask} loading={loading}>
							Create new
						</Button>
					</Col>
					<Col span={24}>{Alerts}</Col>
				</Row>
				{ListErrorMessageAlert}
				<Table
					columns={columns}
					dataSource={Array.isArray(data) ? data : []}
					pagination={false}
					loading={tasksLoading}
				/>
			</Space>
		</Drawer>
	);
}
