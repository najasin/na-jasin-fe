import type { StorybookConfig } from '@storybook/nextjs'

const path = require('path')
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.resolve!!.alias!!['@'] = path.resolve(__dirname, '../')
    return config
  },
  staticDirs: ['../public'],
}
export default config
