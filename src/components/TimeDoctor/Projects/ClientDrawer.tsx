/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useState, useEffect } from 'react';
import { Button, Col, Drawer, Form, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'antd/es/typography/Link';

import AutoCompleteFromDatabase from '../../Reusable/AutoCompleteFromDatabase';
import useRequest from '../../../hooks/useRequest';

import { selectClientProject, setClientProject, setRefresh } from '../../../redux/slices/project';
import { request } from '../../../services/api';
import { TIMEDOCTOR_CONFIG } from '../../../const/appPaths';

const { Item } = Form;

export default function ClientDrawer() {
	const project = useSelector(selectClientProject) || {};
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();

	const { loading, fetch: save, clear, Alerts } = useRequest(request);

	const close = () => {
		setOpen(false);
		clear();
		setTimeout(() => {
			dispatch(setClientProject(undefined));
		}, 300);
	};

	const onFinish = async (values: any) => {
		const response = await save({
			path: TIMEDOCTOR_CONFIG.assignToClient,
			data: { ...values, projectId: project.id },
		});
		if (response.successMessage) {
			dispatch(setRefresh());
			setTimeout(close, 1000);
		}
	};

	useEffect(() => {
		if (typeof project?.clients !== 'undefined') {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [project]);

	return (
		<Drawer open={open} closable onClose={close} title='Assign project to client' destroyOnClose>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
				disabled={loading}>
				<Item name='projectId' label='Project name'>
					<Link strong>{project?.name}</Link>
				</Item>
				<Item label='Client name' name='clientId' required>
					<AutoCompleteFromDatabase
						table='clients'
						column='name'
						select='value:id, label:name'
						order='name'
						onChange={(value: any) => {
							form.setFieldValue('clientId', value as string);
						}}
					/>
				</Item>
				{Alerts}
				<Row>
					<Col xs={0} sm={8} />
					<Col xs={24} sm={16}>
						<Space>
							<Button onClick={close}>Cancel</Button>
							<Button type='primary' htmlType='submit' loading={loading}>
								Submit
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
}
