import React, {ChangeEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ICoin} from 'models/ICoin';
import styles from './styles.module.scss';
import {fixNumber} from '../../assets/utils/functions';
import ChartStatistic from './ChartStatistic';
import ButtonItem from '../../components/ButtonItem';
import PageNotFound from '../page-not-found';
import Layout from '../../components/layout/Layout';
import ModalAddCoin from '../../components/modal/ModalAddCoin';
import TextWriper from '../../components/TextWriper';
import CoinIcon from '../../components/CoinIcon';
import {
    coinInfoParams,
    modeChartStatisticCoin,
} from '../../assets/utils/constants';
import FixButtonBottomRight from '../../components/FixButtonBottomRight';
import {IHistoryDataItem} from 'models/IHistoryDataItem';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setCurrentCoin, setCurrentCoinHistory} from '../../redux/slice/coins';
import {IModeChartCoin} from 'models/ModeChartCoin';
import {client} from '../../trpc';

const PageCoin = () => {
    const params = useParams();
    const coinId = params.id;
    const [isModalActive, setModalActive] = useState(false);
    const [topping, setTopping] = useState<IModeChartCoin>(
        modeChartStatisticCoin[0],
    );
    const [isLoading, setIsLoading] = useState(false);
    const currentCoin = useAppSelector(state => state.coinsAll.currentCoin);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoading(true);
        getDataCoin().then(() => setIsLoading(false));
    }, [topping]);

    const getDataCoin = async () => {
        if (!coinId) return;
        const coinServer: ICoin = await client.getCoinByIdApi.query({coinId: coinId,}) as ICoin;
        const historyServer: IHistoryDataItem[] = await client.getCoinHistoryApi.query({
            coinId: coinId,
            interval: topping.interval
        });
        dispatch(setCurrentCoinHistory(historyServer));
        dispatch(setCurrentCoin(coinServer));
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
                        <FixButtonBottomRight text={'Back'} toPage={'/'}/>
                        {isLoading ? (
                            <TextWriper text={'loading...'} delay={30}/>
                        ) : (
                            <div className={styles.page_content}>
                                <div className={styles.coin_header}>
                                    <div className={styles.coin_visual}>
                                        <CoinIcon
                                            coin={currentCoin!}
                                            size={64}
                                            nameStyle={{fontSize: '32px'}}
                                        />
                                        <span className={styles.coin_symbol}>
											{currentCoin?.symbol}
										</span>
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
                                <div className={styles.coin_body}>
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
                                    <div>
                                        {currentCoin?.id && (
                                            <ChartStatistic
                                                topping={topping}
                                                onChangeMode={onOptionChangeTopping}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                </Layout>
            ) : (
                <PageNotFound/>
            )}
        </div>
    );
};

export default PageCoin;
