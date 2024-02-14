import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { PageError } from './PageError';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof PageError> = {
	title: "widget/PageError",
  	component: PageError,
};

export default meta;
type Story = StoryObj<typeof PageError>;

export const PageErrorLight: Story = {};

export const PageErrorDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};
