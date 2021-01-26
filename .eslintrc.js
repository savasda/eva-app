module.exports = {
	"env": {
			"browser": true,
			"es6": true,
			"node": true
	},
	"extends": [
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/recommended-requiring-type-checking"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
			"project": "tsconfig.json",
			"sourceType": "module",
			"extraFileExtensions": []
	},
	"plugins": [
			"@typescript-eslint",
			"eslint-plugin-import",
			"eslint-plugin-jsdoc",
			"eslint-plugin-prefer-arrow",
			"@angular-eslint"
	],
	"rules": {
			"@typescript-eslint/unbound-method": [
				"error",
				{
					"ignoreStatic": true
				}
			],
			"@typescript-eslint/adjacent-overload-signatures": "error",
			"@typescript-eslint/array-type": "off",
			"@typescript-eslint/ban-types": "error",
			"@typescript-eslint/class-name-casing": "error",
			"@typescript-eslint/consistent-type-assertions": "error",
			"@typescript-eslint/consistent-type-definitions": "error",
			"@typescript-eslint/explicit-member-accessibility": [
					"off",
					{
							"accessibility": "explicit"
					}
			],
			"@typescript-eslint/indent": [
					"error",
					2,
					{
							"FunctionDeclaration": {
									"parameters": "first"
							},
							"FunctionExpression": {
									"parameters": "first"
							},
							"SwitchCase": 1
					}
			],
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/member-delimiter-style": [
					"error",
					{
							"multiline": {
									"delimiter": "semi",
									"requireLast": true
							},
							"singleline": {
									"delimiter": "semi",
									"requireLast": false
							}
					}
			],
			"@typescript-eslint/member-ordering": "error",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-empty-interface": "error",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-inferrable-types": "error",
			"@typescript-eslint/no-misused-new": "error",
			"@typescript-eslint/no-namespace": "error",
			"@typescript-eslint/no-non-null-assertion": "error",
			"@typescript-eslint/no-parameter-properties": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/prefer-for-of": "error",
			"@typescript-eslint/prefer-function-type": "error",
			"@typescript-eslint/prefer-namespace-keyword": "error",
			"@typescript-eslint/quotes": [
					"error",
					"single",
					"avoid-escape"
			],
			"@typescript-eslint/semi": [
					"error",
					"always"
			],
			"@typescript-eslint/triple-slash-reference": "error",
			"@typescript-eslint/type-annotation-spacing": "error",
			"@typescript-eslint/unified-signatures": "error",
			"arrow-body-style": "error",
			"arrow-parens": [
					"off",
					"as-needed"
			],
			"camelcase": "error",
			"comma-dangle": "off",
			"complexity": "off",
			"constructor-super": "error",
			"curly": "error",
			"dot-notation": "error",
			"eol-last": "error",
			"eqeqeq": [
					"error",
					"smart"
			],
			"guard-for-in": "error",
			"id-blacklist": [
					"error",
					"any",
					"Number",
					"number",
					"String",
					"string",
					"Boolean",
					"boolean",
					"Undefined"
			],
			"id-match": "error",
			"import/no-deprecated": "warn",
			"import/order": "off",
			"jsdoc/no-types": "error",
			"max-classes-per-file": "off",
			"max-len": [
					"error",
					{
							"code": 160
					}
			],
			"new-parens": "error",
			"no-bitwise": "error",
			"no-caller": "error",
			"no-cond-assign": "error",
			"no-console": [
					"error",
					{
							"allow": [
									"log",
									"dirxml",
									"warn",
									"error",
									"dir",
									"timeLog",
									"assert",
									"clear",
									"count",
									"countReset",
									"group",
									"groupCollapsed",
									"groupEnd",
									"table",
									"Console",
									"markTimeline",
									"profile",
									"profileEnd",
									"timeline",
									"timelineEnd",
									"timeStamp",
									"context"
							]
					}
			],
			"no-debugger": "error",
			"no-empty": "off",
			"no-eval": "error",
			"no-fallthrough": "error",
			"no-invalid-this": "off",
			"no-multiple-empty-lines": "off",
			"no-new-wrappers": "error",
			"no-restricted-imports": [
					"error",
					"rxjs/Rx"
			],
			"no-shadow": [
					"error",
					{
							"hoist": "all"
					}
			],
			"no-throw-literal": "error",
			"no-trailing-spaces": ["error", { "skipBlankLines": true }],
			"no-undef-init": "error",
			"no-underscore-dangle": "error",
			"no-unsafe-finally": "error",
			"@typescript-eslint/no-unused-expressions": "error",
			"no-unused-labels": "error",
			"no-var": "error",
			"object-shorthand": "error",
			"one-var": [
					"error",
					"never"
			],
			"prefer-arrow/prefer-arrow-functions": "error",
			"prefer-const": "error",
			"quote-props": [
					"error",
					"as-needed"
			],
			"radix": "error",
			"space-before-function-paren": [
					"error",
					{
							"anonymous": "never",
							"asyncArrow": "always",
							"named": "never"
					}
			],
			"spaced-comment": "error",
			"use-isnan": "error",
			"valid-typeof": "off"
	}
};
