/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom "Midnight Glass" Palette
                background: '#020617', // Deep Void (Slate 950)
                surface: '#0f172a',    // Slate 900
                primary: {
                    DEFAULT: '#06b6d4', // Cyan 500
                    glow: '#22d3ee',    // Cyan 400
                },
                secondary: {
                    DEFAULT: '#8b5cf6', // Violet 500
                    glow: '#a78bfa',    // Violet 400
                },
                accent: '#10b981',    // Emerald 500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                'aurora': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), transparent 50%), radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.15), transparent 50%)',
            },
            boxShadow: {
                'neon': '0 0 20px rgba(6, 182, 212, 0.5)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
        },
    },
    plugins: [],
}
