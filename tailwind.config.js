/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        fullheight : "100vh",
      },
      colors:{
        "Blue1" : "#11175D",
        "customBlack": "#000000",
        "btn-color": "#5F35F5",
      },
    },
    fontFamily: {
      Nunito: [ "Nunito Sans","sans-serif"],
      OpenSans: ["Open Sans", "sans-serif"],
      popins: ["Poppins", "sans-serif"],
      
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),  // default: 'standard'

  ],
}

