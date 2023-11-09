import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICoin } from 'models/ICoin';
import styles from './styles.module.scss';
import { fixNumber } from '../../assets/utils/functions';
import ChartStatistic from './ChartStatistic';
import ButtonItem from '../../components/button-item/ButtonItem';
import PageNotFound from '../page-not-found';
import Layout from '../../components/layout/Layout';
import ModalAddCoin from '../../components/modal/ModalAddCoin';
import TextWriper from '../../components/text-wriper/TextWriper';
import CoinIcon from '../../components/coin-icon/CoinIcon';
import {
	coinInfoParams,
	modeChartStatisticCoin,
} from '../../assets/utils/constants';
import { IHistoryDataItem } from 'models/IHistoryDataItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentCoin, setCurrentCoinHistory } from '../../redux/slice/coins';
import { IModeChartCoin } from 'models/ModeChartCoin';
import { client } from '../../trpc';
import FixButton from '../../components/fix-button/FixButton';

const PageCoin = () => {
	const params = useParams();
	const coinId = params.id;
	const [isModalActive, setModalActive] = useState(false);
	const [topping, setTopping] = useState<IModeChartCoin>(
		modeChartStatisticCoin[0],
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingHistory, setIsLoadingHistory] = useState(false);
	const currentCoin = useAppSelector(state => state.coinsAll.currentCoin);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsLoading(true);
		getCoinData().then(() =>
			getCoinHistory().then(() => {
				setIsLoading(false);
				setIsLoadingHistory(false);
			}),
		);
	}, []);

	useEffect(() => {
		setIsLoadingHistory(true);
		getCoinHistory().then(() => setIsLoadingHistory(false));
	}, [topping]);

	const getCoinData = async () => {
		if (!coinId) return;
		const coinServer: ICoin = (await client.getCoinByIdApi.query({
			coinId: coinId,
		})) as ICoin;
		dispatch(setCurrentCoin(coinServer));
	};

	const getCoinHistory = async () => {
		if (!coinId) return;
		const historyServer: IHistoryDataItem[] =
			await client.getCoinHistoryApi.query({
				coinId: coinId,
				interval: topping.interval,
			});
		dispatch(setCurrentCoinHistory(historyServer));
	};

	const handleModalOpen = () => {
		setModalActive(true);
	};

	const handleModalClose = () => {
		setModalActive(false);
	};

	const onOptionChangeTopping = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const mode = modeChartStatisticCoin.find(
			(modeItem: IModeChartCoin) => modeItem.value === value,
		);
		if (mode) setTopping(mode);
	};

	return (
		<div className={styles.page}>
			{currentCoin ? (
				<Layout title={'Coin page'}>
					<>
						<FixButton
							text={'Back'}
							toPage={'/'}
							variant={'right_bottom'}
							idButton={'btn_back'}
						/>
						{isLoading ? (
							<TextWriper text={'loading...'} delayValue={30} />
						) : (
							<div className={styles.page_content}>
								<div className={styles.coin_header} id={'coin-header'}>
									<div className={styles.coin_visual}>
										<CoinIcon
											coin={currentCoin!}
											size={64}
											fontSize={32}
											variant={'symbol'}
										/>
									</div>
									<ButtonItem
										text={'Add to profile'}
										onClick={handleModalOpen}
									/>
									{isModalActive && (
										<ModalAddCoin
											title={'Add coin window'}
											onClose={handleModalClose}
											coin={currentCoin!}
										/>
									)}
								</div>
								<div className={styles.coin_body} id={'coin-body'}>
									<div className={styles.coin_info}>
										{coinInfoParams.map((coinParam, key) => (
											<p className={styles.coin_param} key={key}>
												<span className={styles.param_name}>
													{coinParam.title}:
												</span>
												<span>
													$
													{fixNumber(
														Number(currentCoin[coinParam.value as keyof ICoin]),
														true,
													).toLocaleString()}
												</span>
											</p>
										))}
									</div>
									{false ? (
										<TextWriper text={'loading chart...'} delayValue={30} />
									) : (
										<div>
											{currentCoin?.id && (
												<ChartStatistic
													topping={topping}
													onChangeMode={onOptionChangeTopping}
												/>
											)}
										</div>
									)}
								</div>
							</div>
						)}
					</>
				</Layout>
			) : (
				<PageNotFound />
			)}
		</div>
	);
};

export default PageCoin;
