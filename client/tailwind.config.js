module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        grow: 'grow 300ms ease',
      },
      keyframes: {
        grow: {
          'from' : { transform: 'scale(0)' },
          'to' : { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}