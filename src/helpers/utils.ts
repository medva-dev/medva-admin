import { FormatMoney } from 'format-money-js';

export const formatter = new FormatMoney({
	symbol: '$',
	decimals: 2,
});
