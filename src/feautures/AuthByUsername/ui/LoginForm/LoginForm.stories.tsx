import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from "./LoginForm";
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/storeDecorator";

const meta: Meta<typeof LoginForm> = {
	title: "feautures/LoginForm",
  	component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;


export const LoginFormLight: Story = {
	args: {},
	decorators: [StoreDecorator({
		loginForm: {
			username: "123",
			password: "456"
		}
	})]
};

export const LoginFormDark: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Themes.DARK), 
		StoreDecorator({
			loginForm: {
				username: "123",
				password: "456"
			}
		})
	]
};

export const LoginFormDarkWithError: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Themes.DARK), 
		StoreDecorator({
			loginForm: {
				username: "123",
				password: "456",
				error: "errorr"
			}
		})
	]
};

export const LoginFormLoading: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Themes.DARK), 
		StoreDecorator({
			loginForm: {
				isLoading: true
			}
		})
	]
};


