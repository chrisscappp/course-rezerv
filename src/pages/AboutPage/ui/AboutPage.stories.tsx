import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import AboutPage from './AboutPage';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/app/providers/ThemeProvider/index"

const meta: Meta<typeof AboutPage> = {
	title: "pages/AboutPage",
  	component: AboutPage,
};

export default meta;
type Story = StoryObj<typeof AboutPage>;

export const AboutPageLight: Story = {

};

export const AboutPageDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};

