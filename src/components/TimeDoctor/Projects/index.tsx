import Title from '../../Title';
import ReusableTable from '../../Reusable/ReusableTable';
import SearchAndButtons from '../../Reusable/SearchAndButtons';
import { TIMEDOCTOR_CONFIG } from '../../../const/appPaths';
import { selectRefresh } from '../../../redux/slices/videos';
import { columns } from './columns';
import TaskDrawer from './TaskDrawer';
import ClientDrawer from './ClientDrawer';
const title = 'Time Doctor';
const items = [title, 'Projects'];

const props: ITableRequest = {
	path: TIMEDOCTOR_CONFIG.list,
	table: TIMEDOCTOR_CONFIG.tableName,
	order: TIMEDOCTOR_CONFIG.defaultOrder,
	desc: true,
	selects: TIMEDOCTOR_CONFIG.selects,
	columns,
	refreshSelector: selectRefresh,
};

const searchOptions: ITableSelectOption[] = [
	{ value: 'name', label: 'Project name' },
	{ value: 'tdTasks.name', label: 'Task name' },
	{ value: 'clients.name', label: 'Client name' },
	{ value: 'tdProjectUsers.tdUsers.name', label: 'Assigned user' },
];

const overrideSelects: Record<string, string> = {
	'clients.name': 'clients!inner(name)',
	'tdTasks.name': 'tdTasks!inner(id, name)',
	'tdProjectUsers.tdUsers.name': 'tdProjectUsers!inner(tdUsers!inner(id,name))',
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
			<TaskDrawer />
			<ClientDrawer />
		</>
	);
}
