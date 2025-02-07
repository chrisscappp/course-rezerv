module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	extends: [
		'plugin:react/recommended',
		'plugin:i18next/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'i18next',
		'react-hooks',
		'alexandroo4-plugin'
	],
	rules: {
		indent: ["error", "tab"],
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    	"react-hooks/exhaustive-deps": "error",
		'no-mixed-spaces-and-tabs': 0,
		'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/button-has-type': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'react/jsx-props-no-spreading': 'off',
		'no-shadow': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',
		'i18next/no-literal-string': [
			1 , 
			{
				markupOnly: true, 
				ignoreAttribute: [
					'data-testid', 'to', 'target', 'ref', 'as', 'justify', 'border', 'direction', 'align'
				],
			},
		], // отсутсвие переводов внутри jsx
		'max-len': ['error', 170, { 'ignoreComments': true }],
		"react/display-name": "off",
		'no-undef': 'off',
		'alexandroo4-plugin/fsd-path-checker-beer-insomnia': ['error', { alias: '@' }],
		'alexandroo4-plugin/fsd-public-api-imports-beer-insomnia': [
			'error', 
			{ 
				alias: '@',
				testFilesPatterns: [
					'**/*.test.*', 
					'**/*.stories.*', 
					'**/storeDecorator.tsx'
				]
			}
		],
		'alexandroo4-plugin/fsd-layers-imports-beer-insomnia': [
			'error',
			{
				alias: '@',
				ignoreImportPatterns: ['**/StoreProvider', '**/testing', '**/providers/**']
			}
		]
	},
	globals: {
		__IS_DEV__: true,
		__API__: true,
		__PROJECT__: true
	},
	overrides: [
		{
			files: '**/src/**/*.{test,stories}.{ts,tsx}',
			rules: {
				'i18next/no-literal-string': 'off',
				'max-len': 'off',
			}
		}
	]
}