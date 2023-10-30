import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {ICoin} from 'models/ICoin';
import TopCoinHeader from './TopCoinHeader';
import {useAppSelector} from '../../redux/hooks';
import TextWriper from "../TextWriper";

const TopCoinsBlock = () => {
    const countCoins = 3;
    const coinsAll = useAppSelector(state => state.coinsAll.coinsAll);

    return (
        <div className={styles.top_coins_block}>
            <div className={styles.top_coins_title}>
                {`Top ${countCoins} coins: `}
            </div>
            <div className={styles.top_coins}>
                {coinsAll?.length > 0 ?
                    coinsAll?.slice(0, countCoins)?.map((coin: ICoin, key: number) =>
                        <TopCoinHeader coin={coin} key={key}/>,
                    )
                    : <TextWriper text={'Where coins&'} delay={400}/>
                }
            </div>
        </div>
    );
};

export default TopCoinsBlock;
