/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/pages/EventsPage.jsx',
    './src/pages/HomePage.jsx',
    './src/pages/LoginPage.jsx',
    './src/pages/RoomPage.jsx',
    './src/pages/SignupPage.jsx',

  ],
  theme: {
    extend: {
      backgroundImage:{
        'roomImage': "url('/src/assets/roomImage.jpeg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // This plugin is necessary for form styles
  ],
}

