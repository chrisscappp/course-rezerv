import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof Code> = {
	title: "shared/Code",
  	component: Code,
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
	args: {
		children: 'export default {\n'
        + '    title: \'shared/Code\',\n'
        + '    component: Code,\n'
        + '    argTypes: {\n'
        + '        backgroundColor: { control: \'color\' },\n'
        + '    },\n'
        + '} as ComponentMeta<typeof Code>;\n'
        + '\n'
        + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n'
        + '\n'
        + 'export const Normal = Template.bind({});',
	},
};

