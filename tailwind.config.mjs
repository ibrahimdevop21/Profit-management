/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        'arabic': ['Cairo', 'IBM Plex Arabic', 'Noto Sans Arabic', 'Arial', 'sans-serif'],
        'display': ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        'display-arabic': ['Cairo', 'IBM Plex Arabic', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand Color Palette
        brand: {
          'olive': '#4A3F28',
          'olive-light': '#5A4F38',
          'olive-dark': '#3A2F18',
          'golden': '#F2B200',
          'golden-light': '#F5C533',
          'golden-dark': '#D19A00',
          'orange': '#E1702E',
          'orange-light': '#E8854A',
          'orange-dark': '#C85A1E',
          'off-white': '#FAF8F4',
          'warm-gray': '#EDE8E0',
          'warm-gray-light': '#F2EDE5',
          'warm-gray-dark': '#E0D9D0',
          'charcoal': '#2C2C2C',
          'charcoal-light': '#3C3C3C',
          'charcoal-dark': '#1C1C1C',
        },
        // Semantic color mapping
        primary: {
          50: '#FAF8F4',
          100: '#F2EDE5',
          200: '#EDE8E0',
          300: '#E0D9D0',
          400: '#8B7355',
          500: '#4A3F28',
          600: '#3A2F18',
          700: '#2A1F08',
          800: '#1A0F00',
          900: '#0A0500',
        },
        secondary: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#F5C533',
          500: '#F2B200',
          600: '#D19A00',
          700: '#B08300',
          800: '#8F6C00',
          900: '#6E5500',
        },
        accent: {
          50: '#FDF4ED',
          100: '#FBE9DB',
          200: '#F7D3B7',
          300: '#F3BD93',
          400: '#EFA76F',
          500: '#E1702E',
          600: '#C85A1E',
          700: '#AF440E',
          800: '#962E00',
          900: '#7D1800',
        },
        neutral: {
          50: '#FAF8F4',
          100: '#F2EDE5',
          200: '#EDE8E0',
          300: '#E0D9D0',
          400: '#8B7355',
          500: '#5A4F38',
          600: '#4A3F28',
          700: '#3A2F18',
          800: '#1A1A1A',
          900: '#0F0F0F',
        },
        // High contrast text colors for accessibility
        text: {
          primary: '#1A1A1A',
          secondary: '#2C2C2C',
          muted: '#4A4A4A',
          light: '#666666',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        'brand': '0.025em',
        'wide': '0.05em',
        'wider': '0.1em',
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(74, 63, 40, 0.1), 0 2px 4px -1px rgba(74, 63, 40, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(74, 63, 40, 0.1), 0 4px 6px -2px rgba(74, 63, 40, 0.05)',
        'brand-xl': '0 20px 25px -5px rgba(74, 63, 40, 0.1), 0 10px 10px -5px rgba(74, 63, 40, 0.04)',
        'golden': '0 4px 6px -1px rgba(242, 178, 0, 0.2), 0 2px 4px -1px rgba(242, 178, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    // RTL support plugin
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.rtl .text-start': {
          'text-align': 'right',
        },
        '.rtl .text-end': {
          'text-align': 'left',
        },
        '.rtl .float-start': {
          float: 'right',
        },
        '.rtl .float-end': {
          float: 'left',
        },
        '.rtl .ms-auto': {
          'margin-right': 'auto',
          'margin-left': 'unset',
        },
        '.rtl .me-auto': {
          'margin-left': 'auto',
          'margin-right': 'unset',
        },
        '.rtl .ps-0': { 'padding-right': '0' },
        '.rtl .ps-1': { 'padding-right': '0.25rem' },
        '.rtl .ps-2': { 'padding-right': '0.5rem' },
        '.rtl .ps-3': { 'padding-right': '0.75rem' },
        '.rtl .ps-4': { 'padding-right': '1rem' },
        '.rtl .ps-5': { 'padding-right': '1.25rem' },
        '.rtl .ps-6': { 'padding-right': '1.5rem' },
        '.rtl .ps-8': { 'padding-right': '2rem' },
        '.rtl .pe-0': { 'padding-left': '0' },
        '.rtl .pe-1': { 'padding-left': '0.25rem' },
        '.rtl .pe-2': { 'padding-left': '0.5rem' },
        '.rtl .pe-3': { 'padding-left': '0.75rem' },
        '.rtl .pe-4': { 'padding-left': '1rem' },
        '.rtl .pe-5': { 'padding-left': '1.25rem' },
        '.rtl .pe-6': { 'padding-left': '1.5rem' },
        '.rtl .pe-8': { 'padding-left': '2rem' },
      }
      addUtilities(newUtilities)
    }
  ],
}
