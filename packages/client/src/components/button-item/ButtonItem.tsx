import React from 'react';
import styles from '../styles.module.scss';
import { ButtonItemsArgs } from 'components/ButtonItemTypes';

const ButtonItem = (props: ButtonItemsArgs) => {
	const { text, onClick, type, variant, idButton } = props;

	const getClassNames = () => {
		let classes = `${styles.button_add} `;
		switch (variant) {
			case 'primary':
				break;
			case 'stretch':
				classes += `${styles.button_load}`;
				break;
			default:
				return classes;
		}
		return classes;
	};

	return (
		<input
			className={getClassNames()}
			type={type || 'button'}
			onClick={onClick}
			value={text}
			id={idButton}
		/>
	);
};

export default ButtonItem;
