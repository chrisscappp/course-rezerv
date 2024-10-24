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
		'react-hooks'
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
		'no-shadow': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',
		'i18next/no-literal-string': [
			1 , 
			{
				markupOnly: true, 
				ignoreAttribute: ['data-testid', 'to', 'target', 'ref'],
			},
		], // отсутсвие переводов внутри jsx
		'max-len': ['error', 170, { 'ignoreComments': true }],
		"react/display-name": "off",
		'no-undef': 'off'
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