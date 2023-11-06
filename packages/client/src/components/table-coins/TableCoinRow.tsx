import React from 'react';
import styles from './styles.module.scss';
import { ICoin } from 'models/ICoin';
import { columnsTableCoins } from '../../assets/utils/constants';
import TableRowItem from './TableRowItem';

type Props = {
	coin: ICoin;
};

const TableCoinRow = (props: Props) => {
	const { coin } = props;

	return (
		<div className={styles.coin_row} id={coin.id}>
			{columnsTableCoins.map(column => (
				<TableRowItem coin={coin} column={column} key={column.value} />
			))}
		</div>
	);
};

export default TableCoinRow;
