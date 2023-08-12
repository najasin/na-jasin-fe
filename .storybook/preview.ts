import type { Preview } from '@storybook/react'

const customViewports = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1440px',
      height: '800px',
    },
  },
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '856px',
    },
  },
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: customViewports,
    },
  },
}

export default preview
