import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pixelify-sans)', 'sans-serif'],
        primary: ['var(--font-pixelify-sans)', 'sans-serif'],
        secondary: ['var(--font-delius-swash-caps)', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config
