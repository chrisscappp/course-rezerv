import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from "./ProfileCard";
import { ThemeDecorator } from "@/shared/config/storybookConfig/themeDecorator/themeDecorator";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import AvatarImg from "@/shared/assets/tests/storybook.jpg"
import { Themes } from "@/shared/consts/theme";

const meta: Meta<typeof ProfileCard> = {
	title: "entities/ProfileCard",
  	component: ProfileCard,
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const ProfileCardPrimaryLight: Story = {
	args: {
		data: {
			age: 19,
			city: "aass",
			avatar: AvatarImg,
			firstname: "adsa",
			lastname: "xxx",
			username: "sdsdd",
			currency: Currency.EUR,
			country: Country.Belarus
		}
	},
};

export const ProfileCardPrimaryDark: Story = {
	args: {
		data: {
			age: 19,
			city: "aass",
			avatar: AvatarImg,
			firstname: "adsa",
			lastname: "xxx",
			username: "sdsdd",
			currency: Currency.EUR,
			country: Country.Belarus
		}
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};

export const ProfileCardError: Story = {
	args: {
		error: "true"
	},
};

export const ProfileCardLoading: Story = {
	args: {
		isLoading: true
	},
};


