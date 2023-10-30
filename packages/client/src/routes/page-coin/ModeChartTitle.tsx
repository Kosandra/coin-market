import React, { ChangeEvent } from 'react';

type Props = {
	textLabel: string,
	valueInput: string,
	checkedInput: string,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const ModeChartTitle = (props: Props) => {

	const { checkedInput, valueInput, textLabel, onChange } = props;

	return (
		<label htmlFor={valueInput}>
			<input
				type='radio'
				value={valueInput}
				id={valueInput}
				checked={checkedInput === valueInput}
				onChange={onChange}
			/>
			{textLabel}
		</label>
	);
};

export default ModeChartTitle;
