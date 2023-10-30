import React, { ChangeEventHandler } from 'react';
import styles from './styles.module.scss';
import { FaMagnifyingGlass } from 'react-icons/fa6';

type Props = {
	inputText: string,
	onChange: ChangeEventHandler<HTMLInputElement>,
}

const InputSearch = (props: Props) => {
	const { inputText, onChange } = props;

	return (
		<div className={styles.input_seach_block}>
			<FaMagnifyingGlass className={styles.icon} />
			<input
				className={styles.input_search}
				type={'text'}
				placeholder={inputText}
				onChange={onChange}
			/>
		</div>
	);
};

export default InputSearch;
