import React from 'react';
import { fixNumber, getImagePath } from '../../assets/utils/functions';
import styles from '../styles.module.scss';
import { CoinIconTypes } from 'components/CoinIconTypes';
import { ICoinLocalStorage } from 'models/ICoinLocalStorage';

const CoinIcon = (props: CoinIconTypes) => {
	const { size, coin, fontSize, variant, idElement } = props;

	const variantElements = () => {
		switch (variant) {
			case 'symbol':
				return <span className={styles.coin_symbol}>{coin.symbol}</span>;
			case 'priced':
				return (
					<span className={styles.coin_price}>
						(old price: $
						{fixNumber((coin as ICoinLocalStorage)?.startPrice, true)})
					</span>
				);
			case 'details':
				return (
					<>
						<span className={styles.coin_symbol}>{coin.symbol}</span>
						<span className={styles.coin_price}>
							(old price: $
							{fixNumber((coin as ICoinLocalStorage)?.startPrice, true)})
						</span>
					</>
				);
		}
		return <></>;
	};

	return (
		<div
			className={styles.coin_view}
			style={{ gap: fontSize / 2 }}
			id={idElement}
		>
			<img
				src={getImagePath(coin.symbol)}
				width={`${size}px`}
				height={`${size}px`}
				loading={'lazy'}
				decoding={'async'}
				alt={`${coin.symbol} logo`}
			/>
			<div className={styles.coin_infotext} style={{ fontSize: fontSize! }}>
				<span className={styles.coin_name}>{coin?.name || coin.id}</span>
				{variantElements()}
			</div>
		</div>
	);
};

export default CoinIcon;
