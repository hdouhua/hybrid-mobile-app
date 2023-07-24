module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  root: true,
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', {allow: ['debug', 'warn', 'error']}],
    'no-empty': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    //'@typescript-eslint/explicit-function-return-type': 'warn',
  },
};
