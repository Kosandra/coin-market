import {MouseEventHandler} from "react";

export type ButtonItemsArgs = {
    text?: string;
    onClick?: MouseEventHandler;
    type?: 'submit' | 'button',
    variant?: 'primary' | 'stretch'
};
