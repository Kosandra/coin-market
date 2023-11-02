import { ChangeEventHandler } from 'react';

export type SearchInputTypes = {
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
};
