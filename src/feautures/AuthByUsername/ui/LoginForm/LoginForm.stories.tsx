import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof LoginForm> = {
	title: "feautures/LoginForm",
  	component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;


export const LoginFormLight: Story = {
	args: {
		
	},
};

export const LoginFormDark: Story = {
	args: {
		
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};


