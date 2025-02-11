import { Project } from "ts-morph"
import { isAbsolutePath } from "../utils/isAbsolutePath"

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths("src/**/*.tsx")
// пути для работы ts-morph

const files = project.getSourceFiles()
// получили список всех файлов проекта

files.forEach(file => {
	const importDeclarations = file.getImportDeclarations()
	importDeclarations.forEach(importDeclaration => {
		const value = importDeclaration.getModuleSpecifierValue()
		if (isAbsolutePath(value)) {
			importDeclaration.setModuleSpecifier(`@/${value}`)
		}
	})
})

project.save()