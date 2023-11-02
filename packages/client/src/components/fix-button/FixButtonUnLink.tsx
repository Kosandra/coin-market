import React from 'react';
import styles from '../styles.module.scss';
import { FixButtonArgs } from 'components/FixButtonTypes';

const FixButtonUnLink = (props: FixButtonArgs) => {
	const { text, onClick, variant } = props;
	const getClassNames = () => {
		let classes = `${styles.fix_button_container} `;
		switch (variant) {
			case 'primary':
				break;
			case 'right_bottom':
				classes += `${styles.fix_btn_bottom_right}`;
				break;
			default:
				return classes;
		}
		return classes;
	};

	return (
		<div className={getClassNames()}>
			<div className={styles.fix_button} onClick={onClick}>
				{text}
			</div>
		</div>
	);
};

export default FixButtonUnLink;
