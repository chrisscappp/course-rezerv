import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { AppLink, AppLinkTheme } from './AppLink';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/app/providers/ThemeProvider/index"

const meta: Meta<typeof AppLink> = {
	title: "shared/AppLink",
  	component: AppLink,
	args: {
		to: "/"
	}
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const PrimaryLink: Story = {
	args: {
		children: "Text",
		theme: AppLinkTheme.PRIMARY
	},
};

export const SecondaryLink: Story = {
	args: {
		children: "Text",
		theme: AppLinkTheme.SECONDARY
	},
};

export const PrimaryLinkDark: Story = {
	args: {
		children: "Text",
		theme: AppLinkTheme.PRIMARY
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const SecondaryLinkDark: Story = {
	args: {
		children: "Text",
		theme: AppLinkTheme.SECONDARY
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};
