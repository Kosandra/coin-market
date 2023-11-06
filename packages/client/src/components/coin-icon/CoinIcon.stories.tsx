import React from 'react';
import CoinIcon from './CoinIcon';
import { Meta, StoryObj } from '@storybook/react';
import { bitcoinExpample } from './CoinExample';

const meta: Meta<typeof CoinIcon> = {
	title: 'CoinIcon',
	component: CoinIcon,
	tags: ['autodocs'],
	argTypes: {
		idElement: {
			description: 'Identifier of the component to be tested',
		},
		coin: {
			description: 'Object with information about the coin',
		},
		variant: {
			control: { type: 'select' },
			description: 'Сoin information content selection',
		},
		size: {
			description: 'Coin icon size in "px"',
		},
		fontSize: {
			description: 'Font size for text info about coin',
		},
	},
	args: {
		variant: 'primary',
		size: 32,
		coin: bitcoinExpample,
		fontSize: 18,
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TopCoin: Story = {
	args: {
		fontSize: 18,
		variant: 'primary',
		size: 32,
	},
};

export const TableItem: Story = {
	args: {
		fontSize: 18,
		variant: 'symbol',
		size: 24,
	},
};

export const ModalListItem: Story = {
	args: {
		fontSize: 16,
		variant: 'priced',
		size: 24,
	},
};

export const CoinPage: Story = {
	args: {
		fontSize: 32,
		variant: 'symbol',
		size: 64,
	},
};

export const DetailsCoin: Story = {
	args: {
		fontSize: 18,
		variant: 'details',
		size: 32,
	},
};
