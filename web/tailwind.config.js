/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily :{
        sans:"Comic Neue, sans-serif"
      },
      backgroundImage:{
        app:'url(/BG-effects.png)'
      },
      colors:{
        ignite:{
          500:'#129E57'
        },
        yellow:{
          500:"#F7DD43",
          700:"#e5cd3d"
        },
        gray:{
          100:"#E1E1E6",
          300:"#8D8D99",
          600:"#323238",
          800:"#202024",
          900:"#121214"
        }
      }
    },
  },
  plugins: [],
}
