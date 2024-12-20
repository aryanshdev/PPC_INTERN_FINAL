const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the src folder
    ...flowbite.content(),        // Spread the Flowbite content configuration
  ],
  plugins: [
    // Additional plugins
    flowbite.plugin(),
  ],
};
