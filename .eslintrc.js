module.exports = {
  extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:react/recommended'],
  env: { node: true, browser: true, es6: true },
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': [2, { args: 'none', ignoreRestSiblings: true }],
  },
};
