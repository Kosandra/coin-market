import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import TextWriper from '../text-wriper/TextWriper';
import { ICoin } from 'models/ICoin';
import TableCoinRow from './TableCoinRow';
import { columnsTableCoins } from '../../assets/utils/constants';
import TableHeaderColumn from './TableHeaderColumn';
import { sortArrayNumber } from '../../assets/utils/functions';
import MoreCoinsRow from './MoreCoinsRow';
import { useAppSelector } from '../../redux/hooks';

type Props = {
	inputSearch: string;
	handleMoreCoins: () => void;
	isLoading: boolean;
};

const Index = (props: Props) => {
	const { handleMoreCoins, inputSearch, isLoading } = props;
	const [coinsAll, setCoinsAll] = useState<ICoin[]>([]);
	const coinsAllSelector = useAppSelector(
		state => state.coinsAll.coinsForTable,
	);

	const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const checked = e.target.checked;
		const arrayCoins = [
			...sortArrayNumber(coinsAll || [], value as keyof ICoin),
		];
		if (!checked) setCoinsAll(arrayCoins.reverse());
		else setCoinsAll(arrayCoins);
	};

	useEffect(() => {
		if (coinsAllSelector) {
			setCoinsAll(coinsAllSelector);
		}
	}, [coinsAllSelector]);

	const filterCoinsByName = (coins: ICoin[], search: string) => {
		return coins?.filter(
			coin => coin?.name?.toLowerCase().includes(search?.toLowerCase().trim()),
		);
	};

	return (
		<div className={styles.table_component}>
			<h2 className={styles.table_title}>Coins</h2>
			<div className={styles.table}>
				<div className={styles.table_head}>
					{columnsTableCoins.map(column => (
						<TableHeaderColumn
							column={column}
							sortColumn={column.sorted ? onOptionChange : () => {}}
							key={column.value}
						/>
					))}
				</div>

				<div className={styles.table_content} id={'table-coins'}>
					{isLoading ? (
						<div className={styles.row_empty}>
							<TextWriper text={'Loading redux...'} delayValue={300} />
						</div>
					) : filterCoinsByName(coinsAll, inputSearch)?.length ? (
						filterCoinsByName(coinsAll, inputSearch)?.map((coin: ICoin) => (
							<TableCoinRow coin={coin} key={coin.id} />
						))
					) : (
						<div className={styles.row_empty}>No coins</div>
					)}
				</div>

				<MoreCoinsRow title={'More coins'} onClick={handleMoreCoins} />
			</div>
		</div>
	);
};

export default Index;
