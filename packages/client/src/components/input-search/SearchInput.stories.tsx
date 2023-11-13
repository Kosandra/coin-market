import React from 'react';
import SearchInput from './SearchInput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchInput> = {
	title: 'SearchInput',
	component: SearchInput,
	tags: ['autodocs'],
	argTypes: {
		placeholder: {
			description: 'Placeholder for input field',
		},
		onChange: {
			description: 'Change input text event',
		},
		value: {
			description: 'Text of the input field',
		},
	},
	args: {
		placeholder: 'input something',
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
