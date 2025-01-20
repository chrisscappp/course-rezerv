import webpack from "webpack"
import { BuildOptions } from "./types/config"
import { buildCssLoader } from "./loaders/buildCssLoader"
import { buildBabelLoader } from "./loaders/buildBabelLoader"

export default function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	
	// уже умеет обрабатывать jsx. пишем на нативном js - добавляем babel-loader
	// const typescriptLoader = {
	// 	test: /\.tsx?$/, // фильтруем по этому регулярному выражению файлы, которые пропустим через лоудер
	// 	use: 'ts-loader',
	// 	exclude: /node_modules/,
	// }

	const codeBabelLoader = buildBabelLoader({...options, isTsx: false})
	const tsxCodeBabelLoader = buildBabelLoader({...options, isTsx: true})

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	}

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	}

	const cssLoader = buildCssLoader(options.isDev)
	
	return [
		fileLoader,
		svgLoader,
		codeBabelLoader,
		tsxCodeBabelLoader,
		cssLoader,
	] // порядок возврата лоудеров важен!
}