import React, { useState } from 'react';
import ButtonItem from '../button-item/ButtonItem';
import ModalWindow from './ModalWindow';
import styles from './styles.module.scss';
import { ICoin } from 'models/ICoin';
import { fixNumber } from '../../assets/utils/functions';
import { ICoinLocalStorage } from 'models/ICoinLocalStorage';
import { addCoin } from '../../redux/slice/profile';
import { useAppDispatch } from '../../redux/hooks';

type Props = {
	title: string;
	onClose: () => void;
	children?: React.ReactNode | React.ReactNode[];
	coin?: ICoin;
};

const ModalAddCoin = (props: Props) => {
	const { title, onClose, coin } = props;
	const [countInputValue, setCountInputValue] = useState(0);
	const dispatch = useAppDispatch();

	const onSubmit = () => {
		if (!coin) return;

		const coinAdd: ICoinLocalStorage = {
			id: coin.id,
			symbol: coin.symbol,
			name: coin.name,
			startPrice: fixNumber(coin.priceUsd, true),
			count: countInputValue,
		};
		dispatch(addCoin(coinAdd));
		onClose();
	};

	const getTitle = () => {
		return (
			<div className={styles.title_add_window}>
				{`${title} from coin `}
				<span className={styles.title_coin}>{coin?.name}</span>
			</div>
		);
	};

	return (
		<ModalWindow title={getTitle()} onClose={onClose}>
			<form onSubmit={onSubmit} className={styles.form_add_coin}>
				<div className={styles.form_group}>
					<label htmlFor='name' className={styles.input_label}>
						Count:
					</label>
					<input
						id='name'
						type={'number'}
						min={0}
						max={100}
						className={styles.input_count}
						defaultValue={countInputValue}
						onChange={event => {
							setCountInputValue(Number(event.target.value));
						}}
					/>
				</div>
				<div className={`${styles.form_group} ${styles.position_right}`}>
					<ButtonItem text={'Add Coins'} type='submit' />
				</div>
			</form>
		</ModalWindow>
	);
};

export default ModalAddCoin;
