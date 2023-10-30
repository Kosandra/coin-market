import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ICoin } from 'models/ICoin';
import { calculatePercent, fixNumber } from '../../assets/utils/functions';
import ProfileMoney from './ProfileMoney';
import { ICoinLocalStorage } from 'models/ICoinLocalStorage';
import ModalListCoins from '../modal/ModalListCoins';
import TopCoinsBlock from './TopCoinsBlock';
import { useAppSelector } from '../../redux/hooks';

const Header = () => {
	const [profileSumBuy, setProfileSumBuy] = useState(0);
	const [profileSumNow, setProfileSumNow] = useState(0);
	const [percentDifferentSum, setPercentDifferentSum] = useState(0);
	const [isModalActive, setModalActive] = useState(false);
	const coinsAll = useAppSelector<ICoin[]>(state => state.coinsAll.coinsAll);
	const coinsPersist = useAppSelector<ICoinLocalStorage[]>(state => state.profileCoins.profileCoins);

	const handleModalOpen = () => {
		setModalActive(true);
	};

	const handleModalClose = () => {
		setModalActive(false);
	};

	useEffect(() => {
		setProfileSumBuy(calculateSumBuy());
		setProfileSumNow(calculateSumNow());
		const percent = calculatePercent(fixNumber(profileSumBuy, false), getDifferenceSum());
		setPercentDifferentSum(percent);
	}, [profileSumNow, profileSumBuy, coinsPersist, coinsAll]);

	const calculateSumBuy = () => {
		let buySum = 0;
		coinsPersist.map((coin: ICoinLocalStorage) => {
			buySum += (coin?.startPrice) * coin.count;
		});
		return fixNumber(buySum, false);
	};

	const calculateSumNow = () => {
		let sumNow = 0;
		if (!coinsAll || !coinsPersist) return 0;
		coinsPersist.map((myCoin: ICoinLocalStorage) => {
			const coinInAllCoins = coinsAll.find((coin: ICoin) => coin.id === myCoin.id);
			if (coinInAllCoins) {
				sumNow += Number(coinInAllCoins?.priceUsd) * myCoin.count;
			}
		});
		return fixNumber(sumNow, false);
	};

	const getDifferenceSum = () => {
		return fixNumber(+profileSumNow - +profileSumBuy, false);
	};

	return (
		<div className={styles.header}>
			<div className={styles.header_content}>
				<TopCoinsBlock />
				<ProfileMoney
					differenceSum={getDifferenceSum()}
					differencePercent={percentDifferentSum}
					profileSumBuy={profileSumBuy}
					onClick={handleModalOpen}
				/>
			</div>
			{isModalActive && (
				<ModalListCoins
					title={'Your coin list'}
					onClose={handleModalClose}
				/>
			)}
		</div>
	);
};

export default Header;
