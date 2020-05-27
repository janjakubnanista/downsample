const transformer = require('ts-type-checked/transformer').default;

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-knobs', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.resolve.extensions.push('.ts', '.tsx');
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            getCustomTransformers: program => ({
              before: [transformer(program)],
            }),
          },
        },
      ],
    });

    return config;
  },
};
