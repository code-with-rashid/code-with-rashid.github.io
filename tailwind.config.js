tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                dark: '#0f172a',
                accent: '#06b6d4',
            },
            fontFamily: {
                'sans': ['Space Grotesk', 'sans-serif'],
                'heading': ['Rajdhani', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
}