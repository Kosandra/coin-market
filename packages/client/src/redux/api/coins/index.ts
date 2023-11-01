import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {COINCAP_API, SERVER_API} from '../../../assets/utils/links';
import { ICoin } from 'models/ICoin';
import { IHistoryDataItem } from 'models/IHistoryDataItem';

type PropsGetCoins = {
	limit?: number;
	offset?: number;
};

type PropsGetHistory = {
	idCoin: string;
	interval?: string;
};

type DataAllCoins = {
	data: ICoin[];
	timestamp: number;
};

type DataHistory = {
	data: IHistoryDataItem[];
	timestamp: number;
};

type DataCoin = {
	data: ICoin;
	timestamp: number;
};

export const coinsApi = createApi({
	reducerPath: 'api/coins',
	baseQuery: fetchBaseQuery({ baseUrl: `${COINCAP_API}` }),
	endpoints: build => ({
		getCoins: build.query({
			query: (props: PropsGetCoins) => ({
				url: SERVER_API,
				params: props,
			}),
			transformResponse: (data: DataAllCoins) => data?.data,
		}),
		getCoinById: build.query({
			query: (idCoin: string) => `/v2/assets/${idCoin}`,
			transformResponse: (data: DataCoin) => data?.data,
		}),
		getHistoryCoinById: build.query<IHistoryDataItem[], PropsGetHistory>({
			query: (props: PropsGetHistory) => ({
				url: `/v2/assets/${props.idCoin}/history`,
				params: { interval: props.interval },
			}),
			transformResponse: (data: DataHistory) => data?.data,
		}),
	}),
});

// export const {
// 	useGetCoinsQuery,
// 	useLazyGetCoinByIdQuery,
// 	useLazyGetCoinsQuery,
// 	useLazyGetHistoryCoinByIdQuery,
// } = coinsApi;
