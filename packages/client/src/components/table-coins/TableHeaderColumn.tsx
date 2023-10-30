import React, { ChangeEvent} from 'react';
import styles from './styles.module.scss';
import { IColumnTable } from 'models/ITableColumn';

type Props = {
	column: IColumnTable,
	sortColumn?: (e: ChangeEvent<HTMLInputElement>) => void
}

const TableHeaderColumn = (props: Props) => {
	const { column, sortColumn } = props;

	return (
		<label
			className={styles.table_column_title}
			style={{ flexBasis: `${column.width}%` }}
		>
			<input
				type='checkbox'
				value={column.value}
				id={column.value}
				onChange={sortColumn}
			/>
			{column.title}
		</label>
	);
};

export default TableHeaderColumn;
