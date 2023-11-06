import React from 'react';
import styles from './styles.module.scss';
import ButtonItem from '../button-item/ButtonItem';

type Props = {
	title: string;
	onClick: () => void;
};

const MoreCoinsRow = (props: Props) => {
	const { title, onClick } = props;

	return (
		<div className={styles.row_more_coins}>
			<ButtonItem
				text={title}
				onClick={onClick}
				variant={'stretch'}
				idButton={'btn-more-coins'}
			/>
		</div>
	);
};

export default MoreCoinsRow;
