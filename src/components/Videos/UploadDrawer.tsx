import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Drawer, Upload } from 'antd';
import { TbUpload } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowUploadDrawer, setShowUploadDrawer, setRefresh } from '../../redux/slices/videos';
import { API_URL } from '../../const/defaults';
import { VIDEO_CONFIG } from '../../const/appPaths';
import { getHeaders } from '../../services/api';

export default function UploadDrawer() {
	const show = useSelector(selectShowUploadDrawer);
	const dispatch = useDispatch();
	const [alert, setAlert] = useState({
		message: '',
		type: '',
	});

	const closeDrawer = () => {
		dispatch(setShowUploadDrawer(false));
		dispatch(setRefresh());
		setAlert({ type: '', message: '' });
	};

	const customRequest = async (options: any) => {
		const uploadUrl = new URL(VIDEO_CONFIG.upload, API_URL).href;
		const { onSuccess, onError, file, onProgress } = options;
		const formData = new FormData();
		formData.append('video', file);

		const config = {
			method: 'POST',
			url: uploadUrl,
			data: formData,
			headers: {
				'content-type': 'multipart/form-data',
				...getHeaders(),
			},
			onUploadProgress: (event: any) => {
				const percent = Math.floor((event.loaded / event.total) * 100);
				onProgress({ percent });
			},
		};
		try {
			const { data } = await axios.request(config);
			if (data?.successMessage) {
				setAlert({ type: 'success', message: data.successMessage });
			}

			onSuccess(data);
		} catch (err: any) {
			let message = '';
			if (err?.response?.data?.message) {
				message = err?.response?.data?.message;
				onError(new Error(err?.response?.data?.message));
			} else {
				message = err.message;
				onError(err);
			}
			setAlert({ type: 'error', message });
		}
	};

	return (
		<Drawer open={show} closable onClose={closeDrawer} title='Upload new video' destroyOnClose>
			<Upload listType='text' name='video' customRequest={customRequest} accept='video/mp4'>
				<Button icon={<TbUpload />}>&nbsp;&nbsp;Select video file</Button>
			</Upload>
			{(alert?.message && (
				<Alert type={alert.type as any} message={alert.message} style={{ marginTop: 20 }} />
			)) ||
				null}
		</Drawer>
	);
}
