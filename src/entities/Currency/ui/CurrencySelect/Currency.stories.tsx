import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { CurrencySelect } from './Currency';
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "app/providers/ThemeProvider";

const meta: Meta<typeof CurrencySelect> = {
	title: "entities/CurrencySelect",
  	component: CurrencySelect,
	args: {}
};

export default meta;
type Story = StoryObj<typeof CurrencySelect>;

export const SelectPrimary: Story = {
	args: {
		
	},
};

export const SelectDark: Story = {
	args: {

	},
	decorators: ThemeDecorator(Themes.DARK)
};
