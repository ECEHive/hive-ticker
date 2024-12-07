import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ defaultTheme, children }) {
    const [colorTheme, setColorTheme] = useState(defaultTheme);

    return <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
