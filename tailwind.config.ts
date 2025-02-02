import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#01BF63',
        'primary-hover': '#00A855',
        'primary-active': '#008F47',
        'focus-ring': '#34D399',
      },
    },
  },
  plugins: [],
} satisfies Config;
