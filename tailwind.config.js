/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ['"Sora"', "sans-serif"],
            serif: ['"Rubik"', "serif"],
            body: ['"Sora"', "sans-serif"],
        },
        extend: {
            typography: {
                "2xl": {
                    css: {
                        fontSize: "3.75rem",
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
