import Title from '../Title';
import ReusableTable from '../Reusable/ReusableTable';
import SearchAndButtons from '../Reusable/SearchAndButtons';
import { columns } from './columns';

const title = 'Zoom Users';
const items = [title, 'Users'];

const props: ITableRequest = {
	path: 'zoom/list',
	table: 'zoomUsers',
	order: 'displayName',
	desc: false,
	selects: {
		clients: '*',
	},
	columns,
};

const searchOptions: ITableSelectOption[] = [
	{ value: 'displayName', label: 'Name' },
	{ value: 'email', label: 'Email' },
	{ value: 'department', label: 'Department' },
];

const searchAndButtonsProps: ITableSearchProps = {
	defaultSelected: searchOptions[0].value,
	options: searchOptions,
};

export default function Users() {
	return (
		<>
			<Title title={title} items={items} />
			<SearchAndButtons {...searchAndButtonsProps} />
			<ReusableTable {...props} />
		</>
	);
}
