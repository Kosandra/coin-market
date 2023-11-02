import React from 'react';
import ButtonItem from './ButtonItem';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonItem> = {
	title: 'ButtonItem',
	component: ButtonItem,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'select' },
			description: 'Button type',
		},
		text: {
			description: 'Button text',
			defaultValue: 'false',
		},
		variant: {
			control: { type: 'select' },
			description: 'Button view selection',
		},
		onClick: {
			description: 'Button click event',
		},
	},
	args: {
		type: 'button',
		text: 'Button text',
		variant: 'primary',
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'Add coin',
		variant: 'primary',
	},
};

export const Loading: Story = {
	args: {
		text: 'Load more',
		variant: 'stretch',
	},
};

export const Modal_windows: Story = {
	args: {
		type: 'submit',
		text: 'Submit',
		variant: 'primary',
	},
};
