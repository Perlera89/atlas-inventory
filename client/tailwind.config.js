/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        indigo: '#27187e ',
        'dark-black': '#2c2c2c',
        'light-black': '#202020',
        'border-black': '#272727',
        'content-black': '#141414',
        'ghost-white': '#D3D3D3',
        'font-color': '#adadad',
        'dark-gray': '#1a1a1a',
        'light-gray': '#2c2c2c'
      }
    }
  },
  plugins: []
}
