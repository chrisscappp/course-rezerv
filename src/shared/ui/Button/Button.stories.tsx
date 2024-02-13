import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonTheme } from './Button';
import React from "react"

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>
const Template: ComponentStory<typeof Button> = (args) => <Button {...args}/>

export const Default = Template.bind({})
Default.args = {
	children: "Text",
}

export const Clear = Template.bind({}) 
Clear.args = {
	children: "Text",
	theme: ButtonTheme.CLEAR
}

export const Outline = Template.bind({}) 
Outline.args = {
	children: "Text",
	theme: ButtonTheme.OUTLINE
}

export const Error = Template.bind({}) 
Error.args = {
	children: "Text",
	theme: ButtonTheme.ERROR
}