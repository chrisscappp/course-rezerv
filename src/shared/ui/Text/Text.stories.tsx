import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextTheme } from './Text';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof Text> = {
	title: "shared/Text",
  	component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
	args: {
		title: "Title",
		text: "imt ex ttttt"
	},
};

export const PrimaryDark: Story = {
	args: {
		title: "Title",
		text: "imt ex ttttt"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const Title: Story = {
	args: {
		title: "Title"
	},
};

export const TitleDark: Story = {
	args: {
		title: "Title"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const SecondaryText: Story = {
	args: {
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor molestias iusto dolorem quam necessitatibus quae quis doloremque ut expedita, tempora provident dolore atque voluptatem aspernatur possimus error aut sequi?"
	},
};

export const SecondaryTextDark: Story = {
	args: {
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor molestias iusto dolorem quam necessitatibus quae quis doloremque ut expedita, tempora provident dolore atque voluptatem aspernatur possimus error aut sequi?"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const PrimaryError: Story = {
	args: {
		title: "title error",
		text: "sadfghfdsfghfdssdfghfdssdfghfdss",
		theme: TextTheme.ERROR
	},
};

export const TitleErrorLight: Story = {
	args: {
		title: "title error",
		theme: TextTheme.ERROR
	},
};

export const TextErrorDark: Story = {
	args: {
		text: "title error",
		theme: TextTheme.ERROR
	},
};