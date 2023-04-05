import { Button, Grid } from 'antd';
import { useDispatch } from 'react-redux';
import { TbPlus } from 'react-icons/tb';
import { setGenerateInvoiceDrawer } from '../../redux/slices/invoices';

export default function GenerateInvoicesButton() {
	const { xs, md } = Grid.useBreakpoint();
	const dispatch = useDispatch();

	const showGenerateInvoiceDrawer = () => {
		dispatch(setGenerateInvoiceDrawer(true));
	};

	return (
		<Button
			type='primary'
			block={xs}
			style={{ minWidth: !md ? 50 : 150, maxWidth: !md && !xs ? 150 : undefined }}
			icon={!md && !xs ? <TbPlus /> : null}
			onClick={showGenerateInvoiceDrawer}>
			{!md && !xs ? '' : 'Generate Invoices'}
		</Button>
	);
}
