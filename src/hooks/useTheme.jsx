import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
    const theme = useContext(ThemeContext);
    return theme;
}
