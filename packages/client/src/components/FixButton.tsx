import React  from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type Props = {
	text: string,
	toPage?: string,
	onClick?: () => void,
}


const FixButton = (props: Props) => {
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
