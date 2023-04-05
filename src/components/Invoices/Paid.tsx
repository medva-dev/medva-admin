import Title from '../Title';
import ReusableTable from '../Reusable/ReusableTable';
import SearchAndButtons from '../Reusable/SearchAndButtons';
import { INVOICES_CONFIG } from '../../const/appPaths';
import { selectRefresh } from '../../redux/slices/videos';
import { columns } from './columns';
import InvoiceDrawer from './InvoiceDrawer';

const title = 'Invoices';
const items = [title, 'Paid'];

const props: ITableRequest = {
	path: INVOICES_CONFIG.list,
	table: INVOICES_CONFIG.tableName,
	order: INVOICES_CONFIG.defaultOrder,
	desc: true,
	selects: INVOICES_CONFIG.selects,
	columns,
	refreshSelector: selectRefresh,
	customValues: { status: 'paid' },
};

const searchOptions: ITableSelectOption[] = INVOICES_CONFIG.searchOptions;

const searchAndButtonsProps: ITableSearchProps = {
	defaultSelected: searchOptions[0].value,
	options: searchOptions,
	overrideSelects: {
		'tdProjects.name': 'project:tdProjects!inner(name)',
		'projectClient.clients.name': 'projectClient:tdProjects!inner(clients!inner(name))',
	},
};

export default function PaidInvoicesList() {
	return (
		<>
			<Title title={title} items={items} />
			<SearchAndButtons {...searchAndButtonsProps} />
			<ReusableTable {...props} />
			<InvoiceDrawer />
		</>
	);
}
