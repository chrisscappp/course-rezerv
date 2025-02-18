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
		locales: path.resolve(__dirname, "public", "locales"),
		buildLocales: path.resolve(__dirname, "build", "locales"),
	}

	const mode = env.mode || "development"
	const isDev = mode === "development" ? true : false
	const PORT = env.port || 3000
	const apiURL = env.apiUrl || "http://localhost:5000"
	// извне, или по умолчанию

	const config: webpack.Configuration = buildWebpackConfig({
		mode: mode,
		paths: buildPaths,
		isDev: isDev,
		port: PORT,
		apiURL,
		project: "frontend"
	})
	
	return config
} // вытащили переменные окружения, заданные в скрипте