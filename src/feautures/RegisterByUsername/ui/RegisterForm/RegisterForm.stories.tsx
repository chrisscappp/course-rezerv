import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import RegisterForm from './RegisterForm';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/storeDecorator";

const meta: Meta<typeof RegisterForm> = {
	title: "feautures/RegisterForm",
  	component: RegisterForm,
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;


export const RegisterFormLight: Story = {
	args: {},
	decorators: [StoreDecorator({
		registerForm: {
			username: "asd",
			password: "123",
			repeatPassword: "123"
		}
	})]
};

export const RegisterFormDark: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Themes.DARK), 
		StoreDecorator({
			registerForm: {
				username: "asd",
				password: "123",
				repeatPassword: "123"
			}
		})
	]
};

export const RegisterFormDarkWithError: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Themes.DARK), 
		StoreDecorator({
			registerForm: {
				username: "asd",
				password: "123",
				repeatPassword: "123",
				error: "AMOGUS"
			}
		})
	]
};

export const RegisterFormLoading: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Themes.DARK), 
		StoreDecorator({
			registerForm: {
				isLoading: true
			}
		})
	]
};


