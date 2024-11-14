/** @type {import('tailwindcss').Config} */

const defaultTypograhyStyle = {
    marginTop: ".6em",
    marginBottom: ".25em",
};

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
                        fontSize: "4em",
                        h1: {
                            ...defaultTypograhyStyle,
                        },
                        h2: {
                            ...defaultTypograhyStyle,
                        },
                        h3: {
                            ...defaultTypograhyStyle,
                        },
                        h4: {
                            ...defaultTypograhyStyle,
                        },
                        p: {
                            ...defaultTypograhyStyle,
                            fontSize: "1.2em",
                        },
                        // increase all font sizes in table
                        table: {
                            fontSize: "1em",
                            marginBottom: "1.25em",
                            marginTop: "1.25em",
                        },
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
