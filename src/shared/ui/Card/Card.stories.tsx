import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/shared/consts/theme";

const meta: Meta<typeof Card> = {
	title: "shared/Card",
  	component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardDefault: Story = {
	args: {
		children: <p>Is default card</p>
	}
};

export const CardDefaultDark: Story = {
	args: {
		children: <p>Is default dark card</p>
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

