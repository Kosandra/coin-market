import React from 'react';
import FixButton from './FixButton';
import styles from '../styles.module.scss';
import {FixButtonArgs} from "components/FixButtonTypes";

const FixButtonBottomRight = (props: FixButtonArgs) => {
	const { toPage, text, onClick } = props;

	return (
		<div className={styles.fix_btn_bottom_right}>
			<FixButton text={text} onClick={onClick} toPage={toPage}/>
		</div>
	);
};

export default FixButtonBottomRight;
