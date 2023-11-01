import React from 'react';
import styles from './styles.module.scss';
import ButtonItem from '../buttonItem/ButtonItem';

type Props = {
	title: string,
	onClick: () => void
}

const MoreCoinsRow = (props: Props) => {

	const { title, onClick} = props;

	return (
		<div
			className={styles.row_more_coins}
		>
			<ButtonItem
				text={title}
				onClick={onClick}
				variant={'stretch'}
			/>
		</div>
	);
};

export default MoreCoinsRow;
