/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      fontFamily: {
        "Oswald": ['var(--font-oswald)'],
        "BlackOpsOne": ['var(--font-blackOpsOne)']
      },
      colors:{
        'Tan': '#c8a47e',
      },
    }
  },
  plugins: [],
}
