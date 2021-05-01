const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html'
  ],
  theme: {
    colors: {
      teal: colors.teal
    }
  }
}
