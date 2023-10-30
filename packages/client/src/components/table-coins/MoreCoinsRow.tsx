import React from 'react';
import styles from './styles.module.scss';
import ButtonItem from '../ButtonItem';

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
				classNames={['button_load']}
			/>
		</div>
	);
};

export default MoreCoinsRow;
