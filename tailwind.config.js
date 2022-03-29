const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          'light-gray': '#f8fafe',
          'medium-gray': '#aaaaaa',
          'bold-yellow': '#ffbb20',
          'medium-white': '#f9f9fb',
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
