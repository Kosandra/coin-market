import React  from 'react';
import styles from '../styles.module.scss';
import { Link } from 'react-router-dom';
import {FixButtonArgs} from "components/FixButtonTypes";

const FixButton = (props: FixButtonArgs) => {
	const { toPage, text, onClick } = props;

	return (
		<Link
			to={toPage || '#'}
			className={styles.fix_button}
			onClick={onClick}
		>
			{text}
		</Link>
	);
};

export default FixButton;
