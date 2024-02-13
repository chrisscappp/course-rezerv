import type { Preview } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybookConfig/styleDecorator/styleDecorator"
//import "../../src/app/styles/index.scss"

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		StyleDecorator
	]
};

export default preview;
