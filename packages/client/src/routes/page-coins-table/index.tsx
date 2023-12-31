import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import SearchInput from '../../components/input-search/SearchInput';
import Layout from '../../components/layout/Layout';
import FixButton from '../../components/fix-button/FixButton';
import TableCoins from '../../components/table-coins';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	addCoinsForTable,
	setAllCoins,
	setCoinsForTable,
} from '../../redux/slice/coins';
import { client } from '../../trpc';
import { ICoin } from 'models/ICoin';

const PageCoinsTable = () => {
	const [offsetQuery, setOffsetQuery] = useState(0);
	const [limitQuery, setLimitQuery] = useState<number>(20);
	const [message, setMessage] = useState('');
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getDataQuery().then(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		addMoreCoinsToTable().then();
	}, [offsetQuery, limitQuery]);

	const getDataQuery = async () => {
		const coinsServer: ICoin[] = await client.getCoinsApi.query({
			limit: 2000,
			offset: 0,
		});
		dispatch(setAllCoins(coinsServer));

		const coinsTableServer: ICoin[] = await client.getCoinsApi.query({
			limit: limitQuery,
			offset: offsetQuery,
		});
		dispatch(setCoinsForTable(coinsTableServer));
	};

	const addMoreCoinsToTable = async () => {
		const coinsTableServer: ICoin[] = await client.getCoinsApi.query({
			limit: limitQuery,
			offset: offsetQuery,
		});
		dispatch(addCoinsForTable(coinsTableServer));
	};

	const handleLoadMoreCoins = () => {
		setOffsetQuery(prevState => prevState + 20);
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

	const handleChangeInput = () => {};

	const [inputSearchValue, setInputSearchValue] = useState('');

	return (
		<div className={styles.page}>
			<Layout title={'Table page'}>
				<div className={styles.page_content} id={'page_content'}>
					<SearchInput
						placeholder={'Search by name'}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							const result = event.target.value.replace(/[^a-z.0-9\s-_]/gi, '');
							setMessage(result);
							setInputSearchValue(result);
						}}
						value={message}
					/>
					<div className={styles.btn_scroll_down}>
						<FixButton
							text={'To down'}
							onClick={handleScrollDown}
							idButton={'btn-to-down'}
						/>
					</div>
					<TableCoins
						handleMoreCoins={handleLoadMoreCoins}
						inputSearch={inputSearchValue}
						isLoading={isLoading}
					/>
					<FixButton
						text={'To top'}
						onClick={handleScrollTop}
						variant={'right_bottom'}
						idButton={'btn-to-top'}
					/>
				</div>
			</Layout>
		</div>
	);
};

export default PageCoinsTable;
