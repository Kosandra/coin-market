import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ICoin } from 'models/ICoin';
import { IColumnTable } from 'models/ITableColumn';
import CoinIcon from '../coin-icon/CoinIcon';
import { fixNumber, percentElement } from '../../assets/utils/functions';
import ButtonItem from '../button-item/ButtonItem';
import { useNavigate } from 'react-router-dom';
import ModalAddCoin from '../modal/ModalAddCoin';

type Props = {
	column: IColumnTable;
	coin: ICoin;
};

const TableRowItem = (props: Props) => {
	const { column, coin } = props;
	const navigate = useNavigate();
	const [isModalActive, setModalActive] = useState(false);

	const toPageCoin = (coinNavigate: ICoin) => {
		navigate(`coins/${coinNavigate.id}`);
	};

	const handleModalOpen = () => {
		setModalActive(true);
	};

	const handleModalClose = () => {
		setModalActive(false);
	};

	const renderSwitch = (param: string) => {
		switch (param) {
			case 'rank':
				return coin[param];
			case 'id':
				return (
					<div className={styles.flex_ceil}>
						<CoinIcon coin={coin} size={24} variant={'symbol'} fontSize={18} />
					</div>
				);
			case 'priceUsd':
			case 'marketCapUsd':
				return `$${fixNumber(coin[param], true).toLocaleString()}`;
			case 'changePercent24Hr':
				return percentElement(coin.changePercent24Hr);
			default:
				return <ButtonItem text={'Add'} onClick={handleModalOpen} />;
		}
	};

	return (
		<>
			<div
				className={styles.column_item}
				style={{ flexBasis: `${column.width}%` }}
				onClick={
					column.value !== 'addToProfile' ? () => toPageCoin(coin) : () => {}
				}
			>
				{renderSwitch(column.value)}
			</div>
			{isModalActive && (
				<ModalAddCoin
					title={'Add coin window'}
					onClose={handleModalClose}
					coin={coin}
				/>
			)}
		</>
	);
};

export default TableRowItem;
