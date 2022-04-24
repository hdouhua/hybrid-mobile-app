module.exports = {
  root: true,
  plugins: ['react-hooks'],
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parser: 'babel-eslint',
};
