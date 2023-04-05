import { useState } from 'react';
import { Col, Row, Input, Space, Typography, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/invoices';

const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;

export default function SearchAndButtons({
	defaultSelected,
	overrideSelects,
	options,
	refresh = null,
	extra = null,
}: ITableSearchProps) {
	const dispatch = useDispatch();
	const [column, setColumn] = useState<string>(defaultSelected);
	const onSearch = (keyword: string) => {
		const finalOverrideSelects: Record<string, string> = {};

		if (overrideSelects?.[column]) {
			finalOverrideSelects[column] = overrideSelects[column];
		}

		dispatch(
			setSearch({
				column,
				keyword,
				overrideSelects: finalOverrideSelects,
			}),
		);
	};

	return (
		<Row align='middle' justify='end' style={{ marginTop: 20 }} gutter={[12, 12]}>
			<Col xs={24} sm={20} style={{ textAlign: 'start' }}>
				<Row gutter={[12, 12]}>
					<Col span={24} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
						<Space>
							<Text ellipsis>Search</Text>
							<Select
								style={{ minWidth: 150 }}
								value={column}
								onChange={(value: string) => {
									setColumn(value);
								}}>
								{options?.map?.((option) => {
									return (
										<Option key={option.value} value={option.value}>
											{option.label}
										</Option>
									);
								})}
							</Select>
							<Search placeholder='keyword' onSearch={onSearch} allowClear />
							{refresh}
						</Space>
					</Col>
				</Row>
			</Col>
			<Col xs={24} sm={4} md={4} lg={4} xl={4} xxl={4} style={{ textAlign: 'end' }}>
				{extra}
			</Col>
		</Row>
	);
}
