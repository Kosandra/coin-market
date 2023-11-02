import { createSlice } from '@reduxjs/toolkit';
import { ICoin } from 'models/ICoin';
import { IHistoryDataItem } from 'models/IHistoryDataItem';

const coinsAll = createSlice({
	name: 'coinsAll',
	initialState: {
		coinsAll: <ICoin[]>[],
		coinsForTable: <ICoin[]>[],
		currentCoin: <ICoin>{
			name: '',
			id: '',
			symbol: '',
			priceUsd: 0,
			supply: 0,
			rank: 0,
			maxSupply: 0,
			marketCapUsd: 0,
			changePercent24Hr: 0,
			explorer: '',
			volumeUsd24Hr: 0,
			vwap24Hr: 0,
		},
		currentCoinHistory: <IHistoryDataItem[]>[],
	},
	reducers: {
		setAllCoins(state, action) {
			state.coinsAll = action.payload;
		},
		setCoinsForTable(state, action) {
			state.coinsForTable = action.payload;
		},
		addCoinsForTable(state, action) {
			state.coinsForTable = [...state.coinsForTable, ...action.payload];
		},
		setCurrentCoin(state, action) {
			state.currentCoin = action.payload as ICoin;
		},
		setCurrentCoinHistory(state, action) {
			state.currentCoinHistory = action.payload;
		},
	},
});

export const {
	setAllCoins,
	setCoinsForTable,
	setCurrentCoin,
	setCurrentCoinHistory,
	addCoinsForTable,
} = coinsAll.actions;
export default coinsAll.reducer;
