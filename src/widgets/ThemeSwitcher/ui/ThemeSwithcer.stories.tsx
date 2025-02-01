import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Themes } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof ThemeSwitcher> = {
	title: "widget/ThemeSwitcher",
  	component: ThemeSwitcher,
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const ThemeSwitcherLight: Story = {
	
};

export const ThemeSwitcherDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};
