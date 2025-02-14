import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin"
import { BuildOptions } from "../types/config"

interface BuildBabelLoaderProps extends BuildOptions {
	isTsx: boolean 
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
	return {
		test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				cacheDirectory: true,
				presets: ['@babel/preset-env'],
				plugins: [
					[
						"@babel/plugin-transform-typescript",
						{
							isTsx
						}
					],
					isTsx && !isDev && [
						babelRemovePropsPlugin(),
						{ props: ['data-testid'] }
					],
					"@babel/plugin-transform-runtime"
				].filter(Boolean),
			}
		}
	}
}