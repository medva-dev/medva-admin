import { Alert, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import Fader from '../components/Fader';

function useRequest<TData, TParams>(
	func: useRequestTService<TParams, TData>,
	options: useRequestIOptions = {
		values: {},
		autoStart: false,
		clearErrorMessageOnFetch: true,
		clearSuccessMessageOnFetch: true,
		clearDataOnFetch: true,
		alertStyle: {},
		alertIcon: true,
	},
) {
	const [state, setState] = useState<useRequestIState<TData | undefined>>({
		loading: false,
		errorMessage: undefined,
		successMessage: undefined,
		data: undefined,
	});

	const fetch = async (newValues: TParams = options?.values) => {
		setState({
			...state,
			loading: true,
			errorMessage: options.clearErrorMessageOnFetch ? undefined : state.errorMessage,
			successMessage: options.clearSuccessMessageOnFetch ? undefined : state.successMessage,
			data: options.clearDataOnFetch ? undefined : state.data,
		});

		let data: any;
		let errorMessage: string = '';
		let successMessage: string = '';

		try {
			data = await func(newValues);
			if (data?.successMessage) {
				successMessage = data.successMessage;
			}
			if (data?.errorMessage) {
				errorMessage = data.errorMessage;
			}
		} catch (e: any) {
			errorMessage = e.message;
			data = {
				errorMessage: e.message,
			};
		}

		setState((currentState) => ({
			...currentState,
			loading: false,
			data,
			errorMessage,
			successMessage,
		}));

		return data;
	};

	useEffect(() => {
		if (options.autoStart) {
			void fetch();
		}

		return () => {
			// clear on unmount
			setState({
				loading: false,
				errorMessage: undefined,
				successMessage: undefined,
				data: undefined,
			});
		};
	}, []);

	const ErrorMessageAlert = state.errorMessage ? (
		<Fader>
			<Alert
				showIcon={options?.alertIcon}
				style={options?.alertStyle}
				type='error'
				message={state.errorMessage}
			/>
		</Fader>
	) : null;

	const SuccessMessageAlert = state.successMessage ? (
		<Fader>
			<Alert
				showIcon={options?.alertIcon}
				style={options?.alertStyle}
				type='success'
				message={state.successMessage}
			/>
		</Fader>
	) : null;

	const margin = !!state.errorMessage || !!state.successMessage ? 20 : 0;

	const Alerts = (
		<Row style={{ marginBottom: margin }}>
			<Col span={24}>{ErrorMessageAlert}</Col>
			<Col span={24}>{SuccessMessageAlert}</Col>
		</Row>
	);

	const clear = () => {
		setState({ ...state, errorMessage: undefined, successMessage: undefined });
	};

	return { ...state, ErrorMessageAlert, SuccessMessageAlert, Alerts, fetch, clear };
}

export default useRequest;
