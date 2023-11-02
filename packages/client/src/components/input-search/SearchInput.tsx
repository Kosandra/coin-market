import React from 'react';
import styles from '../styles.module.scss';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { SearchInputTypes } from 'components/SearchInputTypes';

const SearchInput = (props: SearchInputTypes) => {
	const { placeholder, onChange } = props;

	return (
		<div className={styles.input_seach_block}>
			<FaMagnifyingGlass className={styles.icon} />
			<input
				className={styles.input_search}
				type={'text'}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchInput;
