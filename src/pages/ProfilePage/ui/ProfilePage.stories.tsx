import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "app/providers/ThemeProvider/index"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/storeDecorator";

const meta: Meta<typeof ProfilePage> = {
	title: "pages/ProfilePage",
  	component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const ProfilePageLight: Story = {
	decorators: [
		StoreDecorator({}),
	]
};

export const ProfilePageDark: Story = {
	decorators: [
		ThemeDecorator(Themes.DARK),
		StoreDecorator({}),
	]
};

