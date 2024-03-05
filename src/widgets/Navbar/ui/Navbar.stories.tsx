import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/storeDecorator";

const meta: Meta<typeof Navbar> = {
	title: "widget/Navbar",
  	component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const NavbarLight: Story = {
	decorators: [
		StoreDecorator({
			user: {
				authData: undefined
			}
		})
	]
};

export const NavbarDark: Story = {
	decorators: [
		ThemeDecorator(Themes.DARK),
		StoreDecorator({
			user: {
				authData: {
					id: 1,
					username: "asdfg"
				}
			}
		})
	]
};
