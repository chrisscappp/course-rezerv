import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import MainPage from './MainPage';
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "app/providers/ThemeProvider/index"

const meta: Meta<typeof MainPage> = {
	title: "pages/MainPage",
  	component: MainPage,
};

export default meta;
type Story = StoryObj<typeof MainPage>;

export const MainPageLight: Story = {

};

export const MainPageDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};

