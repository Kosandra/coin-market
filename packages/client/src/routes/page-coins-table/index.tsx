import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import InputSearch from '../../components/InputSearch';
import Layout from '../../components/layout/Layout';
import FixButton from '../../components/fixButton/FixButton';
import FixButtonBottomRight from '../../components/fixButton/FixButtonBottomRight';
import TableCoins from '../../components/table-coins';
import {useAppDispatch} from '../../redux/hooks';
import {setAllCoins, setCoinsForTable} from '../../redux/slice/coins';
import TextWriper from '../../components/TextWriper';
import {client} from '../../trpc';
import {ICoin} from 'models/ICoin';

const PageCoinsTable = () => {
    const offsetQuery = 0;
    const [limitQuery, setLimitQuery] = useState<number>(20);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getDataQuery(limitQuery, offsetQuery).then(() => setIsLoading(false));
    }, [offsetQuery, limitQuery]);

    const getDataQuery = async (limit: number, offset: number) => {
        const coinsServer: ICoin[] = await client.getCoinsApi.query({limit: 2000, offset: 0});
        const coinsTableServer: ICoin[] = await client.getCoinsApi.query({
            limit: limit, offset: offset
        });
        dispatch(setAllCoins(coinsServer));
        dispatch(setCoinsForTable(coinsTableServer));
    };

    const handleLoadMoreCoins = () => {
        setLimitQuery(prevState => prevState + 20);
    };

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScrollDown = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const [inputSearchValue, setInputSearchValue] = useState('');

    return (
        <div className={styles.page}>
            <Layout title={'Table page'}>
                <div className={styles.page_content}>
                    <InputSearch
                        inputText={'Search by name'}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setInputSearchValue(event.target.value);
                        }}
                    />
                    <div className={styles.btn_scroll_down}>
                        <FixButton text={'To down'} onClick={handleScrollDown}/>
                    </div>
                    {isLoading ? (
                        <TextWriper text={'Loading...'} delay={300}/>
                    ) : (
                        <TableCoins
                            handleMoreCoins={handleLoadMoreCoins}
                            inputSearch={inputSearchValue}
                        />
                    )}
                    <FixButtonBottomRight text={'To top'} onClick={handleScrollTop}/>
                </div>
            </Layout>
        </div>
    );
};

export default PageCoinsTable;
