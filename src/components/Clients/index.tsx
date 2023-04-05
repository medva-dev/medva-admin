import Title from '../Title';
import ReusableTable from '../Reusable/ReusableTable';
import SearchAndButtons from '../Reusable/SearchAndButtons';
import { CLIENTS_CONFIG } from '../../const/appPaths';
import { selectRefresh } from '../../redux/slices/videos';
import { columns } from './columns';
const title = 'Clients';
const items = [title, 'List'];

const props: ITableRequest = {
	path: CLIENTS_CONFIG.list,
	table: CLIENTS_CONFIG.tableName,
	order: CLIENTS_CONFIG.defaultOrder,
	desc: true,
	selects: CLIENTS_CONFIG.selects,
	columns,
	refreshSelector: selectRefresh,
};

const searchOptions: ITableSelectOption[] = [
	{ value: 'name', label: 'Name' },
	{ value: 'email', label: 'Email' },
];

const searchAndButtonsProps: ITableSearchProps = {
	defaultSelected: searchOptions[0].value,
	options: searchOptions,
};

export default function ClientsList() {
	return (
		<>
			<Title title={title} items={items} />
			<SearchAndButtons {...searchAndButtonsProps} />
			<ReusableTable {...props} />
		</>
	);
}
