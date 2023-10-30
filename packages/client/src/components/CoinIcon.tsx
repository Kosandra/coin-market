import React, { CSSProperties } from 'react';
import { getImagePath } from '../assets/utils/functions';
import { ICoin } from 'models/ICoin';
import styles from './styles.module.scss';
import { ICoinLocalStorage } from 'models/ICoinLocalStorage';

type Props = {
	coin: ICoin | ICoinLocalStorage,
	size: number,
	nameStyle?: CSSProperties
}

const CoinIcon = (props: Props) => {

	const { size, coin, nameStyle } = props;

	return (
		<div className={styles.coin_view}>
			<img
				src={getImagePath(coin.symbol)}
				width={`${size}px`}
				height={`${size}px`}
				loading={'lazy'}
				decoding={'async'}
				alt={`${coin.symbol} logo`}
			/>

			<span
				className={styles.coin_name}
				style={nameStyle!}
			>
                {coin?.name || coin.id}
            </span>
		</div>
	);
};

export default CoinIcon;
