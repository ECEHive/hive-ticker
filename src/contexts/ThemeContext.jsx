import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ defaultTheme, children }) {
    const [colorTheme, setColorTheme] = useLocalStorage("color-theme", "dark");

    return <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
