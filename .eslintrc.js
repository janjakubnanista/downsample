module.exports =  {
  parser:  '@typescript-eslint/parser', // Specifies the ESLint parser
  extends:  [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
  ],
  plugins: [
    'sort-imports-es6-autofix',
  ],
  parserOptions:  {
    ecmaVersion:  2018, // Allows for the parsing of modern ECMAScript features
    sourceType:  'module', // Allows for the use of imports
    ecmaFeatures:  {
      jsx:  true,
    },
  },
  overrides: [{
    files: ['*.js'],
    rules: {
      // And as mentioned here this rule will freak out on .js files as well
      // https://github.com/typescript-eslint/typescript-eslint/issues/906
      //
      // So we disable it for .js files using overrides
      '@typescript-eslint/explicit-function-return-type': 0,

      // And the same goes for member accessibility
      //
      // See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
      '@typescript-eslint/explicit-member-accessibility': 0,

      // And last but not least require() calls are enabled in js files
      '@typescript-eslint/no-var-requires': 0
    }
  }, {
    files: ['test/**.spec.ts'],
    rules: {
      '@typescript-eslint/ban-ts-ignore': 1
    }
  }],
  rules:  {
    // Place to put our Quin-specific rules

    // Prevent forgotten console.* statements
    "no-console": 2,

    "react/prop-types": 0,

    // Make sure imports get sorted
    "sort-imports-es6-autofix/sort-imports-es6": [2, {
      "ignoreCase": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],

    // A special case in which to ignore camelcase found in rollup.config.js
    "@typescript-eslint/camelcase": [1, {
      "allow": ["screw_ie8"]
    }],

    "@typescript-eslint/no-use-before-define": [2, { "variables": false }],

    "@typescript-eslint/explicit-function-return-type": 0
  },
  settings:  {
    react:  {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
      }
    }
  },
};