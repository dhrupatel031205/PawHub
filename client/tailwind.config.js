/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pawGreen: '#A3D9A5',
        pawBlue: '#A7D3F2',
        pawYellow: '#FDE68A',
        pawPink: '#F9D5E5'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif']
      }
    }
  },
  plugins: []
}

