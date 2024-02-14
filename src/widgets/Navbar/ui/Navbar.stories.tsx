import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof Navbar> = {
	title: "widget/Navbar",
  	component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const NavbarLight: Story = {};

export const NavbarDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};
