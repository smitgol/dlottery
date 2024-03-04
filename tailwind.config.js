/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-bg-color': '#090a1a',
        'dark-menu-bg-color-sm': '#16182d',
        'dark-input-bg-color': '#191B39',
        'dark-card-bg-color': '#16182d'
      },
      textColor: {
        'dark-nav-color': '#9ca0d2'
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
