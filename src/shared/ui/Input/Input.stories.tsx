import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/shared/consts/theme";

const meta: Meta<typeof Input> = {
	title: "shared/Input",
  	component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;


export const InputLight: Story = {
	args: {
		placeholder: "Light text",
		value: "12345"
	},
};

export const InputDark: Story = {
	args: {
		placeholder: "Dark text",
		value: "54321"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};


