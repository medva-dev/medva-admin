import { useEffect } from 'react';
import { Button, Col, Drawer, Form, Row, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedVa, setRefresh, setSelectedVa } from '../../redux/slices/vas';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { VIRTUAL_ASSISTANTS_CONFIG } from '../../const/appPaths';

const { Text } = Typography;

export default function StatusDrawer() {
	const [form] = Form.useForm();
	const { loading, Alerts, fetch, clear } = useRequest(request);
	const va = useSelector(selectSelectedVa);
	const dispatch = useDispatch();

	const onClose = () => {
		dispatch(setSelectedVa(null));
		dispatch(setRefresh());
		clear();
	};

	const onFinish = async (values: any) => {
		const { successMessage } = await fetch({
			path: VIRTUAL_ASSISTANTS_CONFIG.updateStatus,
			data: { id: va?.id, status: values?.status },
		});

		if (successMessage) {
			setTimeout(onClose, 2000);
		}
	};

	useEffect(() => {
		if (va?.id > 0) {
			form?.setFieldsValue({ status: va.status });
		}
	}, [va]);

	return (
		<Drawer open={va?.id > 0} title='Update status' closable onClose={onClose} destroyOnClose>
			<Row gutter={[12, 12]}>
				<Col span={6}>First name</Col>
				<Col span={18}>
					<Text ellipsis strong>
						{va?.firstName}
					</Text>
				</Col>
				<Col span={6}>Last name</Col>
				<Col span={18}>
					<Text ellipsis strong>
						{va?.lastName}
					</Text>
				</Col>
				<Col span={6}>Email</Col>
				<Col span={18}>
					<Text ellipsis strong>
						{va?.email}
					</Text>
				</Col>
				<Col span={6}>Status</Col>
				<Col span={18}>
					<Form form={form} onFinish={onFinish}>
						<Form.Item name='status'>
							<Select style={{ width: '100%' }}>
								<Select.Option value='open'>open</Select.Option>
								<Select.Option value='booked'>booked</Select.Option>
								<Select.Option value='hired'>hired</Select.Option>
								<Select.Option value='hidden'>hidden</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</Col>
				<Col span={6} />
				<Col span={18}>{Alerts}</Col>
				<Col span={6} />
				<Col span={18}>
					<Button
						type='primary'
						loading={loading}
						onClick={() => {
							form.submit();
						}}>
						Save changes
					</Button>
				</Col>
			</Row>
		</Drawer>
	);
}
