import { ICoin } from 'models/ICoin';
import { ICoinLocalStorage } from 'models/ICoinLocalStorage';

export type CoinIconTypes = {
	idElement?: string;
	coin?: ICoin | ICoinLocalStorage;
	size?: number;
	variant?: 'primary' | 'symbol' | 'priced' | 'details';
	fontSize?: number;
};
