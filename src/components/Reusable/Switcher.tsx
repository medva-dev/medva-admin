import { useEffect, useState } from 'react';
import { Switch } from 'antd';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { showErrorMessage, showSuccessMessage } from './messages';

interface ISwitcher {
	path: string;
	values: Record<string, any>;
	defaultValue: boolean;
}

export default function Switcher({ path, values, defaultValue }: ISwitcher) {
	const { loading, fetch } = useRequest(request);
	const [value, setValue] = useState<boolean>(defaultValue);

	const update = async (newValue: boolean) => {
		setValue(newValue);
		const response = await fetch({
			path,
			data: {
				...values,
				value: newValue,
			},
		});

		if (response?.errorMessage) {
			setValue(!newValue);
			showErrorMessage(response.errorMessage);
		} else if (response.successMessage) {
			showSuccessMessage(response.successMessage);
		}
	};

	useEffect(() => {}, []);

	return <Switch loading={loading} onChange={update} checked={value} />;
}
