module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
          '@asset': './src/assets',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
