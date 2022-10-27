const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
      '@constants': path.resolve(
        __dirname,
        '../src/constants',
      ),
      '@components': path.resolve(
        __dirname,
        '../src/components',
      ),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@helpers': path.resolve(__dirname, '../src/helpers'),
    }
    return config
  },
}
