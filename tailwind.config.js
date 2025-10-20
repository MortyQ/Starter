import {createThemes} from './src/features/theme/utils/createThemes.ts'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // Base theme extensions can go here
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                18: '4.5rem',
                88: '22rem',
            },
        },
    },
    plugins: [
        // Custom themes plugin
        createThemes({
            light: {
                primary: '#2563eb',
                'primary-dark': '#1e40af',
                secondary: '#64748b',
                accent: '#fbbf24',
                neutral: '#334155',
                'base-100': '#ffffff',
                'base-200': '#f3f4f6',
                'base-300': '#e5e7eb',
                info: '#0ea5e9',
                success: '#22c55e',
                warning: '#f59e0b',
                error: '#ef4444',
                positive: '#22c55e',
                negative: '#ef4444',
                'negative-dark': '#b91c1c',
                lightNegative: '#fecaca',
                'positive-dark': '#15803d',
                lightPositive: '#bbf7d0',
                'warning-dark': '#b45309',
                lightWarning: '#fef3c7',
                cardBg: '#fff',
                cardBorder: '#e5e7eb',
                mainBg: '#f3f4f6',
                mainText: '#1e293b',
                secondaryText: '#64748b',
                inputBg: '#fff',
                primaryHover: '#0e61d5',
                lightGray: '#f3f4f6',
            },
            dark: {
                primary: '#60a5fa',
                'primary-dark': '#2563eb',
                secondary: '#94a3b8',
                accent: '#fbbf24',
                neutral: '#cbd5e1',
                'base-100': '#1e293b',
                'base-200': '#0f172a',
                'base-300': '#334155',
                info: '#38bdf8',
                success: '#22d3ee',
                warning: '#fbbf24',
                error: '#f87171',
                positive: '#22d3ee',
                negative: '#f87171',
                'negative-dark': '#ef4444',
                lightNegative: '#7f1d1d',
                'positive-dark': '#0e7490',
                lightPositive: '#164e63',
                'warning-dark': '#b45309',
                lightWarning: '#78350f',
                cardBg: '#242529',
                cardBorder: '#404040',
                mainBg: '#0f172a',
                mainText: '#f3f4f6',
                secondaryText: '#94a3b8',
                inputBg: '#222c31',
                primaryHover: '#1e40af',
                lightGray: '#334155',
            },
        }),


    ],
}