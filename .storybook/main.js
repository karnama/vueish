const path = require('path');

module.exports = {
  stories: ['../src/**/*.story.@(js|ts|mdx)'],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links"
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, "../src")
    };
    return config;
  },
};
