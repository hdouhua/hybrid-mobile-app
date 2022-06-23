/**
 * this file for React Native CLI configuration, please refer to
 * https://github.com/react-native-community/cli/blob/master/docs/configuration.md
 */

module.exports = {
  dependencies: {
    // disable autolinking for the package
    // https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
