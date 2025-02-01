import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/app/providers/ThemeProvider/index"

const meta: Meta<typeof Spinner> = {
	title: "shared/Spinner",
  	component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const SpinnerLight: Story = {

};

export const SpinnerDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};
