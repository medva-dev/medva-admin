import Title from '../Title';
import ReusableTable from '../Reusable/ReusableTable';
import SearchAndButtons from '../Reusable/SearchAndButtons';
import { VIDEO_CONFIG } from '../../const/appPaths';
import { selectRefresh } from '../../redux/slices/videos';
import { columns } from './columns';
import UploadNewVideo from './UploadNewVideo';
import SetNameDrawer from './SetNameDrawer';
import RefreshTable from './RefreshTable';

const title = 'Videos';
const items = [title, 'List'];

const props: ITableRequest = {
	path: VIDEO_CONFIG.list,
	table: VIDEO_CONFIG.tableName,
	order: VIDEO_CONFIG.defaultOrder,
	desc: true,
	selects: {
		[VIDEO_CONFIG.tableName]: '*',
	},
	columns,
	refreshSelector: selectRefresh,
};

const searchOptions: ITableSelectOption[] = [
	{ value: 'virtualAssistantName', label: 'Name' },
	{ value: 'fileName', label: 'File name' },
];

const searchAndButtonsProps: ITableSearchProps = {
	defaultSelected: searchOptions[0].value,
	options: searchOptions,
	refresh: <RefreshTable />,
	extra: <UploadNewVideo />,
};

export default function List() {
	return (
		<>
			<Title title={title} items={items} />
			<SearchAndButtons {...searchAndButtonsProps} />
			<ReusableTable {...props} />
			<SetNameDrawer />
		</>
	);
}
