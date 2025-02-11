import path from "path"
import { Project } from "ts-morph"
import { isAbsolutePath } from "../utils/isAbsolutePath"

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths("src/**/*.tsx")

const files = project.getSourceFiles()
const sharedUiPath = path.resolve(__dirname, "..", "..", "src", "shared", "ui");
const sharedUiDirectory = project.getDirectory(sharedUiPath)
const componentsDirs = sharedUiDirectory?.getDirectories() ?? []
// ссылаясь на папку с ui в shared слое, получаем все компоненты (директории)

componentsDirs.forEach(directory => {
	// делаем проверку на то есть ли у нас в директории ui компонента index.ts файл уже, или нет
	const indexFilePath = directory.getPath() + '/index.ts'
	const indexFile = directory.getSourceFile(indexFilePath)

	if (!indexFile) {
		// РЭЭКСПОРТ допустим только для UI КОМПОНЕНТОВ ИЗ SHARED
		const sourceCode = `export * from \'./${directory.getBaseName()}\'`
		const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true })
		
		file.save() 
		// сохраняем файл в операционной системе
	}
})

files.forEach(file => {
	const importDeclarations = file.getImportDeclarations()
	importDeclarations.forEach(importDeclaration => {
		const value = importDeclaration.getModuleSpecifierValue()
		const valueWithoutAlias = value.replace('@/', '')
		const segments = valueWithoutAlias.split('/')

		const isSharedLayer = segments?.[0] === 'shared'
		const isUiSlice = segments?.[1] === 'ui'
		// если импортируемый модуль из shared и из ui и он абсоюлтный, то...

		if (isAbsolutePath(valueWithoutAlias) && isSharedLayer && isUiSlice) {
			const result = valueWithoutAlias.split('/').slice(0, 3).join('/')
			// оставляем только shared/ui/Text
			importDeclaration.setModuleSpecifier(`@/${result}`)
		}
	})
})

project.save()