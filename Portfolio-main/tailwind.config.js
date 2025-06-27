/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                navy: {
                    50: '#e3e6f3',
                    100: '#b8bedc',
                    200: '#8c95c5',
                    300: '#606dad',
                    400: '#344496',
                    500: '#1a237e',
                    600: '#151c64',
                    700: '#10154a',
                    800: '#0a0e30',
                    900: '#050718',
                },
                steel: {
                    500: '#1976d2',
                },
                charcoal: {
                    500: '#263238',
                },
                silver: {
                    500: '#b0bec5',
                },
                white: {
                    500: '#ffffff',
                },
            },
            animation: {
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'marquee': 'marquee 25s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'social-hover': 'socialHover 0.3s ease-out forwards',
            },
            keyframes: {
                pulse: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                socialHover: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
}