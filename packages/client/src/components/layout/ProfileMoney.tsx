import React from 'react';
import { coins_icon } from '../../assets/images';
import styles from './styles.module.scss';

type Props = {
	profileSumBuy: number;
	differenceSum: number;
	differencePercent: number;
	onClick?: () => void;
};

const ProfileMoney = (props: Props) => {
	const { profileSumBuy, differenceSum, differencePercent, onClick } = props;

	const positivityDigit = (number: number) => {
		if (number < 0)
			return <span className={styles.negative}>{number.toLocaleString()}</span>;
		if (number > 0)
			return (
				<span className={styles.positive}>+{number.toLocaleString()}</span>
			);
		return <span>{number.toLocaleString()}</span>;
	};

	return (
		<>
			<div className={styles.cart} onClick={onClick} id={'profile-cart'}>
				<div className={styles.sum}>
					<span>{`${profileSumBuy.toLocaleString()} USD `}</span>
					<div>
						{positivityDigit(differenceSum)}
						{` (${differencePercent} %)`}
					</div>
				</div>
				<img
					src={coins_icon}
					width={'36px'}
					height={'36px'}
					loading={'lazy'}
					decoding={'async'}
					alt={`coin icon`}
				/>
			</div>
		</>
	);
};

export default ProfileMoney;
