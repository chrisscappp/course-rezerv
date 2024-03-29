import { StyleDecorator } from "../../src/shared/config/storybookConfig/styleDecorator/styleDecorator"
import { ThemeDecorator } from "../../src/shared/config/storybookConfig/themeDecorator/themeDecorator"
import { RouterDecorator } from "../../src/shared/config/storybookConfig/routerDecorator/routerDecorator"
import { TranslationDecorator } from "../../src/shared/config/storybookConfig/translationDecorator/translationDecorator"
import { Themes } from "../../src/app/providers/ThemeProvider/index"

const preview = {
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
		StyleDecorator,
		ThemeDecorator(Themes.LIGHT),
		RouterDecorator,
	]
};

export default preview;
