module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  // `cap sync` copies the built bundle into android/, so that tree must be
  // excluded or eslint reports hundreds of errors from minified output.
  ignorePatterns: ['dist', 'node_modules', 'android', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',
    // `ignoreRestSiblings` keeps the "omit a key" destructuring idiom legal:
    // `const { user, ...rest } = chat`
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
