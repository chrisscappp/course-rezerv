import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './SideBar';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof Sidebar> = {
	title: "widget/Sidebar",
  	component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const SideBar: Story = {};

export const SidebarDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};
