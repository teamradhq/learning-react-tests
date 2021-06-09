module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  overrides: [{
    files: ['*.test.js', '*.mock.js'],
    rules: {
      'no-undef': 0,
    },
  }],
  parserOptions: {
    ecmaVersion: 2018,
    project: "./tsconfig.json",
  },
  rules: {
    'max-len': ['error', { code: 120, ignoreTrailingComments: true }],
    'import/no-unresolved': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        configFile: './babelrc.js',
        root: ['../src'],
      },
    },
    react: {
      version: 'detect',
    }
  },
};
