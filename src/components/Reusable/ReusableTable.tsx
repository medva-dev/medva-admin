/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Fader from '../Fader';
import useRequest from '../../hooks/useRequest';
import { selectSearch, setSearch } from '../../redux/slices/invoices';
import { request } from '../../services/api';

const { Text } = Typography;

export default function ReusableTable({
	path,
	table,
	order,
	desc,
	selects,
	columns,
	customValues = {},
	refreshSelector,
}: ITableRequest) {
	const [page, setPage] = useState({ newPage: 0, newPageSize: 10 });
	const search = useSelector(selectSearch);
	const dispatch = useDispatch();
	const refresh = refreshSelector ? useSelector(refreshSelector) : null;

	const { loading, data: response, fetch, errorMessage } = useRequest(request);

	const fetchNow = async () => {
		const { newPage, newPageSize } = page;

		await fetch({
			path,
			data: { table, selects, newPage, newPageSize, order, desc, search, ...(customValues ?? {}) },
		});
	};

	useEffect(() => {
		void fetchNow();
	}, [page, search, refresh]);

	useEffect(() => {
		return () => {
			dispatch(setSearch(null));
		};
	}, []);

	const { count, data = [] }: any = response ?? {};

	const locale = {
		emptyText: (errorMessage && <Text type='danger'>{errorMessage}</Text>) || 'No data found',
	};

	return (
		<Fader>
			<div style={{ marginTop: 20, overflow: 'auto', backgroundColor: '#fff', borderRadius: 15 }}>
				<Table
					locale={locale}
					loading={loading}
					columns={columns(dispatch)}
					dataSource={data}
					pagination={{
						style: { marginRight: 20 },
						hideOnSinglePage: true,
						total: Number(count ?? 0),
						onChange(newPage, newPageSize) {
							setPage({ newPage, newPageSize });
						},
					}}
				/>
			</div>
		</Fader>
	);
}
