import React from 'react';
import FixButton from './FixButton';
import styles from './styles.module.scss';

type Props = {
	text: string,
	toPage?: string,
	onClick?: () => void,
}

const FixButtonBottomRight = (props: Props) => {
	const { toPage, text, onClick } = props;

	return (
		<div className={styles.fix_btn_bottom_right}>
			<FixButton text={text} onClick={onClick} toPage={toPage}/>
		</div>
	);
};

export default FixButtonBottomRight;
