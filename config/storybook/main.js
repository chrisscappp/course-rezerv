import * as cn from './webpack.config'

const config = {
	stories: [
		"../../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	addons: [
		"@storybook/addon-links",
		{
			name: "@storybook/addon-essentials",
			options: {
				backgrounds: false
			}
		},
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
		"storybook-addon-themes"
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	docs: {
		autodocs: "tag",
	}
};
export default config;
