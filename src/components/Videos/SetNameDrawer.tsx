import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Col, Drawer, Input, Row } from 'antd';
import type { InputRef } from 'antd';
import { selectVideoId, setVideoId, setRefresh } from '../../redux/slices/videos';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { VIDEO_CONFIG } from '../../const/appPaths';

export default function SetNameDrawer() {
	const id = useSelector(selectVideoId);
	const inputRef = useRef<InputRef>(null);
	const dispatch = useDispatch();
	const { loading, fetch, ErrorMessageAlert, SuccessMessageAlert } = useRequest(request, {
		alertStyle: { marginTop: 20 },
		alertIcon: true,
	});

	const closeDrawer = () => {
		if (loading) {
			return;
		}
		dispatch(setVideoId(0));
		dispatch(setRefresh());
	};

	const submit = async () => {
		const name = inputRef.current?.input?.value;
		const { successMessage } = await fetch({
			path: VIDEO_CONFIG.update_name,
			data: { name, id },
		});

		if (successMessage) {
			setTimeout(closeDrawer, 3000);
		}
	};

	return (
		<Drawer open={id > 0} closable onClose={closeDrawer} title='Update VA Name'>
			<Row gutter={[12, 12]}>
				<Col span={6}>VA Name</Col>
				<Col span={18}>
					<Input ref={inputRef} />
				</Col>
				<Col span={24}>
					<Alert
						type='info'
						message='The rendering process will start after updating the virtual assistant name.'
						showIcon
					/>
					{ErrorMessageAlert}
					{SuccessMessageAlert}
				</Col>
				<Col span={6} />
				<Col span={18}>
					<Button type='primary' loading={loading} onClick={submit}>
						Update name and render
					</Button>
				</Col>
			</Row>
		</Drawer>
	);
}
