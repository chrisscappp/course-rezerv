import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import CopyPlugin from "copy-webpack-plugin"
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CircularDependencyPlugin = require("circular-dependency-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

export default function buildPlugins({ paths, isDev, apiURL, project }: BuildOptions): webpack.WebpackPluginInstance[] {

	const plugins = [
		new HtmlWebpackPlugin({
			template: paths.html // теперь будет браться шаблон этого файла
		}),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
			__API__: JSON.stringify(apiURL),
			__PROJECT__: JSON.stringify(project)
		}), // глобальная переменная
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true
				},
				mode: 'write-references'
			}
		}) // вынесли рантайм проверку типов в отдельный процесс
	]

	if (isDev) {
		plugins.push(new ReactRefreshWebpackPlugin())
		plugins.push(new BundleAnalyzerPlugin({
			openAnalyzer: false
		}))
	}

	if (!isDev) {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}))
		plugins.push(new CopyPlugin({
			patterns: [
				{ from: paths.locales, to: paths.buildLocales }
			]
		}))
	} // вынесли плагины для prod отдельно, для дев отдельно. ускоряем сборку

	return plugins
} // функция вернёт плагины для webpack