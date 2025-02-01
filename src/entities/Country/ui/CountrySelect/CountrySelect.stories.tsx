import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { CountrySelect } from './CountrySelect';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/app/providers/ThemeProvider";

const meta: Meta<typeof CountrySelect> = {
	title: "entities/CountrySelect",
  	component: CountrySelect,
	args: {}
};

export default meta;
type Story = StoryObj<typeof CountrySelect>;

export const CountrySelectPrimary: Story = {
	args: {
		
	},
};

export const CountrySelectDark: Story = {
	args: {

	},
	decorators: ThemeDecorator(Themes.DARK)
};
