import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { NotFoundPage} from './NotFoundPage';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/shared/consts/theme";

const meta: Meta<typeof NotFoundPage> = {
	title: "pages/NotFoundPage",
  	component: NotFoundPage,
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const NotFoundPageLight: Story = {

};

export const NotFoundPageDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};

