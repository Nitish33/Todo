module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@modals': './src/modals',
          "@navigation": "./src/navigation",
          "@network": "./src/network",
          "@query": "./src/query",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
        },
      },
  ],
    'react-native-reanimated/plugin',
  ],
};
