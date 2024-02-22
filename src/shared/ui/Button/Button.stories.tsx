import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof Button> = {
	title: "shared/Button",
  	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Text",
	},
};

export const Clear: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.CLEAR
	},
};

export const ClearInverted: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.CLEAR_INVERTED
	},
};

export const Outline: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.OUTLINE
	},
};

export const OutlineInverted: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.OUTLINE_INVERTED
	},
};

export const OutlineDark: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.OUTLINE
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const OutlineDarkSizeL: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.OUTLINE,
		size: ButtonSize.L
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const OutlineDarkSizeXL: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.OUTLINE,
		size: ButtonSize.XL
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const Error: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.ERROR
	},
};

export const Background: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.BACKGROUND
	},
};

export const BackgroundDark: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.BACKGROUND
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const BackgroundInverted: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.BACKGROUND_INVERTED
	},
};

export const BackgroundInvertedDark: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.BACKGROUND
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const Square: Story = {
	args: {
		children: "Text",
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true
	},
};

export const SquareSizeS: Story = {
	args: {
		children: ">",
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true,
		size: ButtonSize.S
	},
};

export const SquareSizeM: Story = {
	args: {
		children: ">",
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true,
		size: ButtonSize.M
	},
};

export const SquareSizeL: Story = {
	args: {
		children: ">",
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true,
		size: ButtonSize.L
	},
};

export const SquareSizeXL: Story = {
	args: {
		children: ">",
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true,
		size: ButtonSize.XL
	},
};
