module.exports = {
  stories: ['../src/**/*.story.@(ts)'],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links"
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
      options: { appendTsSuffixTo: [/\.vue$/] },
    });

    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    return config;
  }
};
