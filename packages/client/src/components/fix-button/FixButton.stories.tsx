import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FixButtonUnLink from './FixButtonUnLink';

const meta: Meta<typeof FixButtonUnLink> = {
	title: 'FixButton',
	component: FixButtonUnLink,
	tags: ['autodocs'],
	argTypes: {
		idButton: {
			description: 'Identifier of the component to be tested',
		},
		text: {
			description: 'Button text',
		},
		variant: {
			control: { type: 'select' },
			description: 'Button view selection',
		},
		onClick: {
			description: 'Button click event',
		},
		toPage: {
			description: 'Path to go to the page',
		},
	},
	args: {
		text: 'Back',
		variant: 'primary',
		toPage: '/',
	},
	parameters: {
		docs: {
			description: {
				story:
					'The function of this button is to go to another page. The Link tag is not properly supported, so this component is illustrative.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BottomRight: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'The function of this button is to go to another page. The Link tag is not properly supported, so this component is illustrative. ' +
					'This button has a fixed position on the page, which may cause it to display incorrectly when viewed as a separate component.',
			},
		},
	},
	args: {
		variant: 'right_bottom',
	},
};
