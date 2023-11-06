import { MouseEventHandler } from 'react';

export type ButtonItemsArgs = {
	idButton?: string;
	text?: string;
	onClick?: MouseEventHandler;
	type?: 'submit' | 'button';
	variant?: 'primary' | 'stretch';
};
