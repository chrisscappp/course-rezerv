import webpack from "webpack"
import { BuildPaths } from "../build/types/config"
import path from "path"
import { isConfigModule } from "../../src/shared/lib/typeGuards/configGuard"
import { buildCssLoader } from "../build/loaders/buildCssLoader"
import { buildSvgLoader } from "../build/loaders/buildSvgLoader"

export default ({config}: {config: webpack.Configuration}) => {
	const paths: BuildPaths = {
		build: "",
		entry: "",
		html: "",
		src: path.resolve(__dirname, "..", "..", "src"),
		locales: "",
		buildLocales: ""
	}

	config?.resolve?.modules?.push(paths.src)
	config?.resolve?.extensions?.push('.ts', '.tsx')
	config.resolve!.alias = {
		...config!.resolve!.alias,
		'@': paths.src
	}

	if (isConfigModule(config.module?.rules)) {
		config.module.rules = config.module.rules.map((rule: any) => {
			if (/svg/.test(rule.test as string)) {
				return {...rule, exclude: /\.svg$/i}
			}
			return rule
		})
		config.module.rules.push(buildSvgLoader())
		config.module.rules.push(buildCssLoader(true))
	}
	
	config.plugins?.push(new webpack.DefinePlugin({
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify(""),
		__PROJECT__: JSON.stringify("storybook")
	})) // теперь сторибук знает о глобальных переменных
	
	return config
}