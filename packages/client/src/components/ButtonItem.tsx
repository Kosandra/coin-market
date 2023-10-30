import React, { CSSProperties, MouseEventHandler } from 'react';
import styles from './styles.module.scss';

type Props = {
	text: string;
	onClick?: MouseEventHandler;
	style?: CSSProperties;
	type?: string,
	classNames?: string[]
};

const ButtonItem = (props: Props) => {
	const { text, onClick, style, type, classNames } = props;
	const getClasses = () => {
		let stringClasses = ``;
		classNames?.map(className => {
			stringClasses += `${styles[className]} `;
		});
		return stringClasses;
	};

	return (
		<input
			className={`${styles.button_add} ${getClasses()}`}
			type={type || 'button'}
			onClick={onClick}
			value={text}
			style={style}
		/>
	);
};

export default ButtonItem;
