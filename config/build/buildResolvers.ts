import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export default function buildResolvers(options: BuildOptions): ResolveOptions {
	return {
    	extensions: ['.tsx', '.ts', '.js'],
		//alias: {
		//	Utilities: path.resolve(__dirname, 'src/utilities/'),
      	//	Templates: path.resolve(__dirname, 'src/templates/'),
		//} // нужны алиасы для каждой папки. долго
		preferAbsolute: true,
		modules: [options.paths.src, "node_modules"],
		mainFiles: ['index'], // главный файл в папке
		alias: {} // пустые, тк preferAbsolute && modules
  	}
}