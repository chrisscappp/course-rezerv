import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import MainPage from './MainPage';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { StoreDecorator } from "@/shared/config/storybookConfig/storeDecorator/storeDecorator";
import { Themes } from "@/shared/consts/theme";

const meta: Meta<typeof MainPage> = {
	title: "pages/MainPage",
  	component: MainPage,
};

export default meta;
type Story = StoryObj<typeof MainPage>;

export const MainPageLight: Story = {
	decorators: [StoreDecorator({
		counter: {
			value: 10
		}
	})]
};

export const MainPageDark: Story = {
	decorators: [
		ThemeDecorator(Themes.DARK),
		StoreDecorator({
			counter: {
				value: 10
			}
		})
	]
};

