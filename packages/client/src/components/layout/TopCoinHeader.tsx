import React from 'react';
import { ICoin } from 'models/ICoin';
import styles from './styles.module.scss';
import { fixNumber } from '../../assets/utils/functions';
import CoinIcon from '../CoinIcon';

const TopCoinHeader = ({ coin }: { coin: ICoin }) => {
	return (
		<div className={styles.top_coin_item}>
			<div className={styles.coin_icon}>
				<CoinIcon coin={coin} size={32} />
			</div>
			<span className={styles.price}>
                ${fixNumber(coin.priceUsd, true).toLocaleString()}
            </span>
		</div>
	);
};

export default TopCoinHeader;
