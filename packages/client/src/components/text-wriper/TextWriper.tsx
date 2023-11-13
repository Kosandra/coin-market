import React, { useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import { TextWriperTypes } from 'components/TextWriperTypes';

const TextWriper = (props: TextWriperTypes) => {
	const { text, delayValue, style } = props;

	const [currentText, setCurrentText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setCurrentText(prevText => prevText + text[currentIndex]);
				setCurrentIndex(prevIndex => prevIndex + 1);
			}, delayValue);

			return () => clearTimeout(timeout);
		}
	}, [currentIndex, delayValue, text]);

	return (
		<div className={`${styles.text_wriper}`} style={style} id={'text-wriper'}>
			{currentText}
		</div>
	);
};

export default TextWriper;
