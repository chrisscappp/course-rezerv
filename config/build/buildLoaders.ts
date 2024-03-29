import webpack from "webpack"
import { BuildOptions } from "./types/config"
import { buildCssLoader } from "./loaders/buildCssLoader"
import path from "path"

export default function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	
	// уже умеет обрабатывать jsx. пишем на нативном js - добавляем babel-loader
	const typescriptLoader = {
		test: /\.tsx?$/, // фильтруем по этому регулярному выражению файлы, которые пропустим через лоудер
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	const babelLoader = {
		test: /\.(ts|tsx)$/,
		include: path.resolve(__dirname, 'src'),
		exclude: /(node_modules|bower_components|build)/,
		use: ['babel-loader']
	}

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

	const cssLoader = buildCssLoader(isDev)
	
	return [
		fileLoader,
		svgLoader,
		babelLoader,
		typescriptLoader,
		cssLoader,
	] // порядок возврата лоудеров важен!
}