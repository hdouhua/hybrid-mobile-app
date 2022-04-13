module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'react-native/no-inline-styles': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parser: 'babel-eslint',
};
