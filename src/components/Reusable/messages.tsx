import { message } from 'antd';

export const showErrorMessage = (content: React.ReactNode) => {
	void message.error({
		content,
	});
};

export const showSuccessMessage = (content: React.ReactNode) => {
	void message.success({
		content,
	});
};
