import Title from '../Title';
import ReusableTable from '../Reusable/ReusableTable';
import SearchAndButtons from '../Reusable/SearchAndButtons';
import { VIRTUAL_ASSISTANTS_CONFIG } from '../../const/appPaths';
import { selectRefresh } from '../../redux/slices/vas';
import { columns } from './columns';
import StatusDrawer from './StatusDrawer';

const title = 'Virtual Assistants';
const items = [title, 'List'];

const props: ITableRequest = {
	path: VIRTUAL_ASSISTANTS_CONFIG.list,
	table: VIRTUAL_ASSISTANTS_CONFIG.tableName,
	order: VIRTUAL_ASSISTANTS_CONFIG.defaultOrder,
	desc: true,
	selects: {
		[VIRTUAL_ASSISTANTS_CONFIG.tableName]: '*',
	},
	columns,
	refreshSelector: selectRefresh,
};

const searchOptions: ITableSelectOption[] = [
	{ value: 'firstName', label: 'First name' },
	{ value: 'lastName', label: 'Last name' },
	{ value: 'phone', label: 'Phone' },
	{ value: 'email', label: 'Email' },
	{ value: 'medvaEmail', label: 'MedVA email' },
	{ value: 'province', label: 'Province' },
	{ value: 'country', label: 'Country' },
	{ value: 'status', label: 'Status' },
];

const searchAndButtonsProps: ITableSearchProps = {
	defaultSelected: searchOptions[0].value,
	options: searchOptions,
};

export default function List() {
	return (
		<>
			<Title title={title} items={items} />
			<SearchAndButtons {...searchAndButtonsProps} />
			<ReusableTable {...props} />
			<StatusDrawer />
		</>
	);
}
