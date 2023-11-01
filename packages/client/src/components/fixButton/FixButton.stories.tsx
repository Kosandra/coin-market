import React from 'react';
import FixButton from "./FixButton";
import {Meta, StoryObj} from "@storybook/react";
import {BrowserRouter} from "react-router-dom";

const meta: Meta<typeof FixButton> = {
    title: 'FixButton',
    component: FixButton,
    tags: ['autodocs'],
    args: {
        text: 'Okey'
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <BrowserRouter>
                <div style={{display: 'flex'}}>
                    <FixButton text={'Hello'}/>
                </div>
            </BrowserRouter>
        );
    }
};
