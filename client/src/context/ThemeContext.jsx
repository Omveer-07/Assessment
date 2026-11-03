import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
const THEME_STORAGE_KEY = "sprintboard-theme";

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const value = useMemo(() => ({
        theme,
        toggleTheme: () => setTheme(currentTheme =>
            currentTheme === "light" ? "dark" : "light"
        )
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
