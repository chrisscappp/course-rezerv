import webpack from "webpack"
import { BuildPaths } from "../build/types/config"
import path from "path"
import { isStringArr, isConfigModule } from "../../src/shared/lib/typeGuards/configGuard"
import { buildCssLoader } from "../build/loaders/buildCssLoader"

export default ({config}: {config: webpack.Configuration}) => {
	const paths: BuildPaths = {
		build: "",
		entry: "",
		html: "",
		src: path.resolve(__dirname, "..", "..", "src")
	}

	if (isStringArr(config.resolve?.modules) && isStringArr(config.resolve?.extensions)) {
		config.resolve.modules.push(paths.src)
		config.resolve.extensions.push('ts', 'tsx')
	}

	if (isConfigModule(config.module?.rules)) {
		config.module?.rules.push(buildCssLoader(true))
	}
	
	return config
}