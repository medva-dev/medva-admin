import type { FunctionComponent } from 'react';
import { Col, Row } from 'antd';
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCollapsed, selectHideSideBar } from '../../redux/slices/user';
import NotFound from '../NotFound';
import ComponentMaps from './ComponentMaps';

function Wrapper() {
	const collapsed = useSelector(selectCollapsed);
	const hideSideBar = useSelector(selectHideSideBar);

	const { menu, submenu } = useParams();

	const [Component, setComponent] = React.useState<FunctionComponent>(
		React.lazy(async () => {
			return await import('../NotFound');
		}),
	);

	React.useEffect(() => {
		const key = `${String(menu)}${String(submenu ?? '') ? `/${String(submenu)}` : ''}`;

		const theComponent = ComponentMaps[key] ?? 'NotFound';

		const ObjectComponent = React.lazy(async () => {
			return await import(`../${theComponent}`).catch((e) => ({
				default: () => {
					return <NotFound message={e.message} />;
				},
			}));
		});
		setComponent(ObjectComponent);
	}, [menu, submenu]);

	const marginLeft = hideSideBar ? 0 : collapsed ? 75 : 250;

	return (
		<Suspense>
			<div
				style={{
					marginLeft,
				}}>
				<div style={{ maxWidth: 1700, margin: '0 auto' }}>
					<Component />
				</div>
			</div>
		</Suspense>
	);
}

export default Wrapper;
