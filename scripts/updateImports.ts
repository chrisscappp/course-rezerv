import { Project } from "ts-morph"

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths("src/**/*.tsx")
// пути для работы ts-morph

const files = project.getSourceFiles()
// получили список всех файлов проекта

const layers = ["app", "pages", "widgets", "feautures", "entities", "shared"];

function isAbsolute(value: string) {
	return layers.some(layer => value.startsWith(layer))
}

files.forEach(file => {
	const importDeclarations = file.getImportDeclarations()
	importDeclarations.forEach(importDeclaration => {
		const value = importDeclaration.getModuleSpecifierValue()
		if (isAbsolute(value)) {
			importDeclaration.setModuleSpecifier(`@/${value}`)
		}
	})
})

project.save()