import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { LangSwitcher} from './LangSwitcher';
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "@/app/providers/ThemeProvider/index"

const meta: Meta<typeof LangSwitcher> = {
	title: "widget/LangSwitcher",
  	component: LangSwitcher,
};

export default meta;
type Story = StoryObj<typeof LangSwitcher>;

export const LangSwitcherLight: Story = {

};

export const LangSwitcherDark: Story = {
	decorators: [ThemeDecorator(Themes.DARK)]
};

