import React, { CSSProperties, useEffect, useState } from 'react';
import styles from './styles.module.scss';

type Props = {
	text: string,
	delay: number,
	className?: string,
	style?: CSSProperties,
}

const TextWriper = (props: Props) => {
	const { text, delay, className, style } = props;

	const [currentText, setCurrentText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setCurrentText(prevText => prevText + text[currentIndex]);
				setCurrentIndex(prevIndex => prevIndex + 1);
			}, delay);

			return () => clearTimeout(timeout);
		}
	}, [currentIndex, delay, text]);

	return (
		<div
			className={`${styles.text_wriper} ${styles[className!]}`}
			style={style}
		>
			{currentText}
		</div>
	);
};

export default TextWriper;
