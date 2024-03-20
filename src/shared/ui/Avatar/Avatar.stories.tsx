import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImg from "./storybook.jpg"
import AvatarDefault from "./storybookDefault.jpg"

const meta: Meta<typeof Avatar> = {
	title: "shared/Avatar",
  	component: Avatar,
	args: {}
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const AvatarDef: Story = {
	args: {
		size: 150,
		src: AvatarDefault
	},
};

export const AvatarSmall: Story = {
	args: {
		size: 50,
		src: AvatarImg
	},
};
