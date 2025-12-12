/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lato"', '"Montserrat"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        // Nocturne Palette
        midnight: {
          DEFAULT: '#040812',
          50: '#1a2a4a',
          100: '#152238',
          200: '#0f1a2a',
          300: '#0a1220',
          400: '#060c18',
          500: '#040812',
          600: '#030610',
          700: '#02040a',
          800: '#010206',
          900: '#000102',
        },
        navy: {
          DEFAULT: '#152238',
          light: '#1e3050',
          dark: '#0c1525',
        },
        sunrise: {
          DEFAULT: '#e8c27f',
          light: '#f0d49f',
          dark: '#d4a85f',
          glow: 'rgba(232, 194, 127, 0.3)',
        },
        ember: {
          DEFAULT: '#d67c45',
          light: '#e09565',
          dark: '#b86530',
          glow: 'rgba(214, 124, 69, 0.3)',
        },
        starlight: '#ffffff',
        cloud: {
          DEFAULT: '#c4d4e0',
          light: '#dbe7f0',
          dark: '#9ab5c8',
        },
        silhouette: '#0a0a0a',
        // Glass effect colors
        glass: {
          white: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.15)',
          highlight: 'rgba(255, 255, 255, 0.25)',
        },
        // Keep existing colors for backwards compatibility
        cream: '#FAFAF9',
        paper: '#FFFFFF',
        ink: '#1C1917',
        slate: '#2c3e50',
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        safe: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      backgroundImage: {
        'nocturne-sky': 'linear-gradient(to bottom, #040812 0%, #152238 40%, #e8c27f 85%, #d67c45 100%)',
        'nocturne-sky-short': 'linear-gradient(to bottom, #040812 0%, #152238 60%, #2a3f5f 100%)',
        'sunrise-glow': 'radial-gradient(ellipse at bottom center, rgba(232, 194, 127, 0.4) 0%, transparent 60%)',
        'ember-glow': 'radial-gradient(ellipse at bottom center, rgba(214, 124, 69, 0.3) 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-gold': '0 0 40px rgba(232, 194, 127, 0.3)',
        'glow-ember': '0 0 30px rgba(214, 124, 69, 0.25)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        'twinkle-fast': 'twinkle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
