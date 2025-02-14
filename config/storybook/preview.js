import { StyleDecorator } from "../../src/shared/config/storybookConfig/styleDecorator/styleDecorator"
import { ThemeDecorator } from "../../src/shared/config/storybookConfig/themeDecorator/themeDecorator"
import { RouterDecorator } from "../../src/shared/config/storybookConfig/routerDecorator/routerDecorator"
import { SuspenseDecorator } from "../../src/shared/config/storybookConfig/SuspenseDecorator/SuspenseDecorator"
import { Themes } from "../../src/shared/consts/theme"

const preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "fullscreen",
		themes: {
			default: 'light',
			list: [
				{ name: 'light', class: Themes.LIGHT, color: '#ffffff' },
				{ name: 'dark', class: Themes.DARK, color: '#000000' },
				{ name: 'orange', class: Themes.ORANGE, color: '#ffb005' }
			]
		}
	},
	decorators: [
		StyleDecorator,
		ThemeDecorator(Themes.LIGHT),
		RouterDecorator,
		SuspenseDecorator
	]
};

export default preview;
