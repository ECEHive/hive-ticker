import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ defaultTheme, children }) {
    const [colorTheme, setColorTheme] = useLocalStorage("color-theme", "dark");

    const toggleColorTheme = () => {
        setColorTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return <ThemeContext.Provider value={{ colorTheme, toggleColorTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
