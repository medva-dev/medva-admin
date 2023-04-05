import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Col, DatePicker, Drawer, Form, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenerateInvoiceDrawer, setGenerateInvoiceDrawer } from '../../redux/slices/invoices';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { INVOICES_CONFIG } from '../../const/appPaths';

const { Item } = Form;

export default function GenerateInvoiceDrawer() {
	const open = useSelector(selectGenerateInvoiceDrawer);
	const { data: lastInvoice, fetch } = useRequest(request);
	const { loading: generating, fetch: generateNow, Alerts, clear } = useRequest(request);

	const [fromDate, setFromDate] = useState<any>(undefined);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const closeDrawer = () => {
		if (generating) {
			return;
		}

		dispatch(setGenerateInvoiceDrawer(false));
	};

	const onFinish = async (values: any) => {
		const endDate = values?.endDate?.format('YYYY-MM-DD');

		const result = await generateNow({ path: INVOICES_CONFIG.generate, data: { endDate } });

		if (result.successMessage) {
			setTimeout(() => {
				closeDrawer();
				clear();
			}, 3000);
		}
	};

	useEffect(() => {
		void fetch({ path: INVOICES_CONFIG.lastInvoiceGenerateDate });
	}, []);

	useEffect(() => {
		setFromDate(dayjs(lastInvoice?.value?.date ?? undefined, 'YYYY-MM-DD').add(1, 'day'));
	}, [lastInvoice]);

	return (
		<Drawer open={open} closable onClose={closeDrawer} title='Generate invoices'>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				labelAlign='left'
				onFinish={onFinish}>
				<Item label='Start date'>
					<DatePicker
						style={{ width: '100%' }}
						size='large'
						value={fromDate}
						disabled
						format={'MMMM DD, YYYY'}
					/>
				</Item>
				<Item label='End date' name='endDate'>
					<DatePicker
						style={{ width: '100%' }}
						size='large'
						format={'MMMM DD, YYYY'}
						disabledDate={(d) => !d || d.isBefore(fromDate)}
					/>
				</Item>
				{Alerts}
				<Row>
					<Col xs={0} sm={8} />
					<Col xs={24} sm={16}>
						<Space>
							<Button onClick={closeDrawer}>Cancel</Button>
							<Button type='primary' htmlType='submit' loading={generating}>
								Generate now
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
}
