import {createSlice} from '@reduxjs/toolkit';
import {ICoinLocalStorage} from 'models/ICoinLocalStorage';

const profileCoins = createSlice({
    name: 'profileCoins',
    initialState: {
        profileCoins: <ICoinLocalStorage[]>[],
    },
    reducers: {

        addCoin(state, action) {
            const newCoinData: ICoinLocalStorage = {
                id: action.payload.id,
                symbol: action.payload.symbol,
                name: action.payload.name,
                startPrice: action.payload.startPrice,
                count: action.payload.count,
            };
            const indexCoin = state.profileCoins.findIndex((coinItem: ICoinLocalStorage) => coinItem.id === newCoinData.id);
            if (indexCoin >= 0)
                state.profileCoins[indexCoin].count += newCoinData.count;
            else
                state.profileCoins.push(newCoinData);
        },

        deleteCountCoinById(state, action) {
            const coinIndex = state.profileCoins.findIndex(coinItem => coinItem.id === action.payload.id);
            const newCount = +state.profileCoins[coinIndex].count - +action.payload.count;
            if (newCount <= 0)
                state.profileCoins = state.profileCoins.filter(coin => coin.id !== action.payload.id);
            else
                state.profileCoins[coinIndex].count = newCount;
        },
    },
});

export const {addCoin, deleteCountCoinById} = profileCoins.actions;
export default profileCoins.reducer;
