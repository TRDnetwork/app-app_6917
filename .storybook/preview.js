import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'warm bg', value: '#faf8f5' },
      { name: 'surface', value: '#ffffff' },
      { name: 'dark', value: '#1a2e1a' },
    ],
  },
};
---