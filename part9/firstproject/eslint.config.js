const eslint = require("@eslint/js")
const tseslint = require("typescript-eslint")
const stylistic = require("@stylistic/eslint-plugin")

module.exports = tseslint.config({
	files: ["**/*.ts"],
	extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
	languageOptions: {
		parserOptions: {
			project: true,
			tsconfigRootDir: process.env.dirname,
		},
	},
	plugins: {
		"@stylistic": stylistic,
	},
	rules: {
		"@typescript-eslint/no-unsafe-assignment": "error",
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/restrict-template-expressions": "off",
		"@typescript-eslint/restrict-plus-operands": "off",
		"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
	},
})
