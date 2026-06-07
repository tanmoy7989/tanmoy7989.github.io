/** @type {import('tailwindcss').Config} */
import { buildDaisyThemes } from './theme.config.mjs';

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                brand: 'var(--brand-accent)',
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: [buildDaisyThemes()],
    },
};
