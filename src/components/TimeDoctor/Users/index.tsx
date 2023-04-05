import Title from '../../Title';
import ReusableTable from '../../Reusable/ReusableTable';
import SearchAndButtons from '../../Reusable/SearchAndButtons';
import { TIMEDOCTOR_CONFIG } from '../../../const/appPaths';
import { selectRefresh } from '../../../redux/slices/videos';
import { columns } from './columns';
const title = 'Time Doctor';
const items = [title, 'Users'];

const props: ITableRequest = {
	path: TIMEDOCTOR_CONFIG.users,
	table: TIMEDOCTOR_CONFIG.userTable,
	order: TIMEDOCTOR_CONFIG.defaultOrder,
	desc: true,
	selects: TIMEDOCTOR_CONFIG.userSelects,
	columns,
	refreshSelector: selectRefresh,
};

const searchOptions: ITableSelectOption[] = [
	{ value: 'name', label: 'User name' },
	{ value: 'email', label: 'Email' },
	{ value: 'employeeId', label: 'Employee ID' },
	{ value: 'tdProjectUsers.tdProjects.name', label: 'Project name' },
];

const overrideSelects: Record<string, string> = {
	'tdProjectUsers.tdProjects.name': 'tdProjectUsers!inner(tdProjects!inner( name ))',
};

const searchAndButtonsProps: ITableSearchProps = {
	defaultSelected: searchOptions[0].value,
	options: searchOptions,
	overrideSelects,
};

export default function TimeDoctorProjects() {
	return (
		<>
			<Title title={title} items={items} />
			<SearchAndButtons {...searchAndButtonsProps} />
			<ReusableTable {...props} />
		</>
	);
}
