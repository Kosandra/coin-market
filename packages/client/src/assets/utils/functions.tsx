import { ICoin } from 'models/ICoin';
import stylesTableCoin from '../../components/table-coins/styles.module.scss';
import React from 'react';
import { IMAGES_API } from './links';
import { coinsimages } from '../../data/coinsimages';
import { LS_PROFILE } from './constants';
import { ICoinLocalStorage } from 'models/ICoinLocalStorage';

export const sortArrayString = (array: ICoin[]) => {
	return [...array].sort((a: ICoin, b: ICoin) => {
		const nameA = a?.id.toUpperCase();
		const nameB = b?.id.toUpperCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
};

export const sortArrayNumber = (array: ICoin[], field: keyof ICoin) => {
	return [...array].sort((a: ICoin, b: ICoin) => Number(b[field]) - Number(a[field]));
};

export const fixNumber = (numberStr: number, noZero: boolean) => {
	const number = Number(numberStr);
	let numfix = Number(number.toFixed(2));
	if (noZero && numfix <= 0.01) {
		numfix = 0.01;
	}
	return numfix;
};

export const calculatePercent = (digitFrom: number, digitValue: number) => {
	const percent = digitValue / digitFrom * 100;
	return Math.abs(fixNumber(percent || 0, false));
};

export const percentElement = (percentStr: number) => {
	const percent = fixNumber(Number(percentStr), false);
	const style = percent < 0 ? 'minus_percent' : 'plus_percent';
	let res = '';
	if (percent > 0) res = `+${percent}`;
	else res = percent.toString();
	return <div className={stylesTableCoin[style]}>{res}%</div>;
};

export const getImagePath = (symbol: string) => {
	return `${IMAGES_API}/${coinsimages[symbol as keyof typeof coinsimages] || 1}.png`;
};

export const checkForDevice = () => window.innerWidth < 768;

export const getCoinByIdLocalStorage = (idCoin: string) => {
	const arrayCoins = JSON.parse(localStorage[LS_PROFILE]);
	return arrayCoins.find((coin: ICoinLocalStorage) => coin.id === idCoin);
};
