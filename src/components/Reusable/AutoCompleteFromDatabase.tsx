/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import { Select, Spin, Typography } from 'antd';
import useRequest from '../../hooks/useRequest';
import { request } from '../../services/api';
import { AUTOCOMPLETE_CONFIG } from '../../const/appPaths';

const { Text } = Typography;

interface IOption {
	value: number | string;
	label: string;
}
interface IProps {
	table: string;
	column: string;
	select: string;
	order: string;
	onChange: (value: string | number | string[] | number[]) => void;
	placeholder?: string;
	multiple?: boolean;
}

export default function AutoCompleteFromDatabase({
	table,
	column,
	select,
	order,
	onChange,
	placeholder = 'Type a keyword',
	multiple = false,
}: IProps) {
	const { loading, fetch, data, errorMessage } = useRequest(request);
	const [text, setText] = useState<string>();
	const [options, setOptions] = useState<IOption[]>([]);

	const debounceFetcher = useMemo(() => {
		const loadOptions = async (keyword: string) => {
			if (keyword?.length < 1) {
				return;
			}

			setOptions([]);

			await fetch({
				path: AUTOCOMPLETE_CONFIG.options,
				data: { table, column, select, order, keyword },
			});
		};

		return debounce(loadOptions, 300);
	}, [table, column, select, order, onChange]);

	useEffect(() => {
		setOptions(data ?? []);
	}, [data]);

	return (
		<Select
			mode={multiple ? 'multiple' : undefined}
			placeholder={placeholder}
			allowClear
			showSearch
			searchValue={text}
			filterOption={false}
			onSearch={(keyword: string) => {
				setText(keyword);
				void debounceFetcher(keyword);
			}}
			notFoundContent={
				loading ? (
					<div style={{ textAlign: 'center' }}>
						<Spin size='small' />
					</div>
				) : (
					<Text type={errorMessage ? 'danger' : 'secondary'}>
						{errorMessage || 'No data found'}
					</Text>
				)
			}
			options={options}
			onChange={onChange}
		/>
	);
}
