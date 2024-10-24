export type BuildMode = "production" | "development"

export interface BuildPaths {
	entry: string; // точка входа
	build: string; // путь до сборки
	html: string; // путь до html файла
	src: string;
	locales: string; // путь до переводов
	buildLocales: string; // путь, куда нужно закинуть переводы
}

export interface BuildEnv {
	mode: BuildMode,
	port: number,
	apiUrl: string,
}

export interface BuildOptions {
	mode: BuildMode,
	paths: BuildPaths,
	isDev: boolean,
	port: number,
	apiURL: string,
	project: "storybook" | "frontend" | "jest"
}