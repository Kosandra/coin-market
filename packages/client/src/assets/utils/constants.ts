import { IColumnTable } from 'models/ITableColumn';
import { IModeChartCoin } from 'models/ModeChartCoin';

export const LS_PROFILE = 'profile_coins';

export const sortedColumnsTableCoins = [
	{
		title: 'Price',
		value: 'priceUsd',
		width: '15%',
	},
	{
		title: 'Market Cap',
		value: 'marketCapUsd',
		width: '15%',
	},
	{
		title: 'Last 24h',
		value: 'changePercent24Hr',
		width: '15%',
	},
];

export const columnsTableCoins: IColumnTable[] = [
	{
		title: '№',
		value: 'rank',
		sorted: false,
		width: 5,
	},
	{
		title: 'Name',
		value: 'id',
		sorted: false,
		width: 32,
	},
	{
		title: 'Price',
		value: 'priceUsd',
		sorted: true,
		width: 15,
	},
	{
		title: 'Market Cap',
		value: 'marketCapUsd',
		sorted: true,
		width: 23,
	},
	{
		title: 'Last 24h',
		value: 'changePercent24Hr',
		sorted: true,
		width: 10,
	},
	{
		title: 'Add to profile',
		value: 'addToProfile',
		sorted: false,
		width: 10,
	},
];

export const modeChartStatisticCoin:IModeChartCoin[] = [
	{
		title: 'Day',
		value: 'day',
		interval: 'h1',
		points: 24,
	},
	{
		title: 'Week',
		value: 'week',
		interval: 'd1',
		points: 7,
	},
	{
		title: 'Month',
		value: 'month',
		interval: 'd1',
		points: 30,
	},
];

export const coinInfoParams = [
	{
		title: 'Rank',
		value: 'rank',
	},
	{
		title: 'Supply',
		value: 'supply',
	},
	{
		title: 'Price',
		value: 'priceUsd',
	},
	{
		title: 'Market cap',
		value: 'marketCapUsd',
	},
	{
		title: 'Max supply',
		value: 'maxSupply',
	},
];
