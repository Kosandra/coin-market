import React, { useEffect, useState } from 'react';
import ModalWindow from './ModalWindow';
import styles from './styles.module.scss';
import ButtonItem from '../ButtonItem';
import CoinIcon from '../CoinIcon';
import { ICoinLocalStorage } from 'models/ICoinLocalStorage';
import { deleteCountCoinById } from '../../redux/slice/profile';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

type Props = {
	title: string;
	onClose: () => void;
	children?: React.ReactNode | React.ReactNode[];
};

type Counter = {
	count: number,
	idCount: string
}

const ModalListCoins = (props: Props) => {
	const { title, onClose } = props;
	const coinsPersist = useAppSelector(state => state.profileCoins.profileCoins);
	const [countInputValue, setCountInputValue] = useState<Counter>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log(coinsPersist);
	}, []);

	const deleteCoins = (idCoin: string) => {
		if (countInputValue?.idCount !== idCoin) return;
		dispatch(deleteCountCoinById({ id: idCoin, count: countInputValue?.count! }));
	};

	return (
		<ModalWindow title={title} onClose={onClose}>
			<div className={styles.modal_list_content}>
				<ul>
					{coinsPersist.length > 0 ?
						coinsPersist.map((coin: ICoinLocalStorage, key: number) => {
							return <li key={key}>
								<form className={styles.item_list} onSubmit={() => {
									deleteCoins(coin.id);
									onClose();
								}}>

									<div className={styles.input_label}>
										<CoinIcon coin={coin} size={24} />
										{`(${coin?.count})`}
									</div>
									<div className={styles.item_list_right}>
										<input
											id={coin.id}
											type={'number'}
											min={0}
											max={coin.count}
											defaultValue={0}
											className={styles.input_count}
											onChange={(event) => {
												setCountInputValue({
														count: Number(event.target.value),
														idCount: coin.id,
													},
												);
											}}
										/>
										<ButtonItem type={'submit'} text={'Delete'} />
									</div>

								</form>
							</li>;
						})
						: <div className={styles.input_empty}>No coins</div>
					}
				</ul>
			</div>
		</ModalWindow>
	);
};

export default ModalListCoins;
