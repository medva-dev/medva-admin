import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import LoggedIn from './components/LoggedIn';

import AppPaths from './const/appPaths';
import Wrapper from './components/LoggedIn/Wrapper';
import './App.css';
import AfterLogin from './components/Google/AfterLogin';
import AfterConsent from './components/Google/AfterConsent';

function App() {
	return (
		<BrowserRouter>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#293893',
						colorError: '#FF2E63',
					},
				}}>
				<Routes>
					<Route path={AppPaths.googleAfterConsent} element={<AfterConsent />} />
					<Route path={AppPaths.googleAfterLogin} element={<AfterLogin />} />
					<Route path={AppPaths.login} element={<Login />} />
					<Route path={AppPaths.logout} element={<div>logout</div>} />
					<Route path={AppPaths.main} element={<LoggedIn />}>
						<Route path=':menu/:submenu/:tab' element={<Wrapper />} />
						<Route path=':menu/:submenu' element={<Wrapper />} />
						<Route path=':menu' element={<Wrapper />} />
					</Route>
					<Route path='*' element={<Navigate to='login' />} />
				</Routes>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
