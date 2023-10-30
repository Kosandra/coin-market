import React, { ReactElement } from 'react';
import styles from './styles.module.scss';
import Header from './Header';

type Props = {
	title: string,
	children: ReactElement;
}

const Layout: React.FC<Props> = ({ title, children }) => {


	return (
		<div className={styles.layout}>
			<Header />
			{children}
		</div>
	);
};

export default Layout;
