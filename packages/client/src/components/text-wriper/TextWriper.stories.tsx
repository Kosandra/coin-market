import React from 'react';
import TextWriper from './TextWriper';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextWriper> = {
	title: 'TextWriper',
	component: TextWriper,
	tags: ['autodocs'],
	argTypes: {
		text: {
			description: 'Displayed animated text',
		},
		delayValue: {
			description: 'Value for changing the speed of text animation',
		},
		style: {
			description: 'CSS component styling',
		},
	},
	args: {
		text: 'Loading',
		delayValue: 300,
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Custom: Story = {
	args: {
		text: 'WOOOOOOOOOOW',
		style: { color: 'red', fontSize: '28px', fontWeight: 'bold' },
		delayValue: 150,
	},
};
