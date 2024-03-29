module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
          '.jpg',
          '.png',
          '.svg',
          '.webp',
        ],
        alias: {
          '@app-json': './app.json',
          '@asset': './src/assets',
          '@shared': './src/shared',
          '@/*': './src/*',
        },
      },
    ],
  ],
};
