import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Themes } from "app/providers/ThemeProvider/index"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/storeDecorator";
import AvatarImg from "shared/assets/tests/storybook.jpg"
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";

const meta: Meta<typeof ProfilePage> = {
	title: "pages/ProfilePage",
  	component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const ProfilePageLight: Story = {
	decorators: [
		StoreDecorator({
			editableProfile: {
				form: {
					age: 19,
					city: "aass",
					avatar: AvatarImg,
					firstname: "adsa",
					lastname: "xxx",
					username: "sdsdd",
					currency: Currency.EUR,
					country: Country.Belarus
				},
				readonly: true
			}
		}),
	]
};

export const ProfilePageDark: Story = {
	decorators: [
		ThemeDecorator(Themes.DARK),
		StoreDecorator({
			editableProfile: {
				form: {
					age: 19,
					city: "aass",
					avatar: AvatarImg,
					firstname: "adsa",
					lastname: "xxx",
					username: "sdsdd",
					currency: Currency.EUR,
					country: Country.Belarus
				}
			}
		}),
	]
};

