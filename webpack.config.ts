import webpack from "webpack"
import path from "path"
import { buildWebpackConfig } from "./config/build/buildWebpackConfig"
import { BuildEnv, BuildPaths } from "./config/build/types/config"

//const path = require("path")
//const HTMLWebpackPlugin = require("html-webpack-plugin")
//const webpack = require("webpack")
// module.exports = {...}

// ts-node синтаксис

export default (env: BuildEnv) => {

	const buildPaths: BuildPaths = {
		entry: path.resolve(__dirname, "src", "index.tsx"),
		build: path.resolve(__dirname, "build"),
		html: path.resolve(__dirname, "public", "index.html"),
		src: path.resolve(__dirname, "src"),
	}

	const mode = env.mode || "development"
	const isDev = mode === "development" ? true : false
	const PORT = env.port || 3000

	const config: webpack.Configuration = buildWebpackConfig({
		mode: mode,
		paths: buildPaths,
		isDev: isDev,
		port: PORT
	})
	
	return config
} // вытащили переменные окружения, заданные в скрипте