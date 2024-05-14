/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Lavish: ["Lavish", "sans-serif"],
      Philosopher: ["Philosopher", "sans-serif"],
      BreeSerif: ["BreeSerif", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'bgimg': "url('/wall4.webp')",
        'bgform': "url('/Wall2.png')",
        'bghome': "url('/Home.png')",

      },
      colors: {
        //Maneth
        'primary': '#da6e2e',
        'secondary': '#c15026',
        'ternary': '#6e2e2c',
        'bgc': '#FCEADC',



        //varagan
        'red1': '#DC3545',





        //Sandithi










        //Ridmi
        'formbg' : "#D9D9D9",
        'PMnavbar' : "#DEE2E6",
        'RawmRequest' : "#F8D3C0",









        //Gihan








        //Sageevan








        //Isuru
        'homebg':"#FFBB70",








        //Hiranya
        'formBackground': "#d9d9d9",
        'navbar': "#dee2e6",
        'aboutUs' : "#da6e2e",
        'div2' : "#fceadc",






      },
    },
  },
  plugins: [],
}

