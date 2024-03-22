import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from "./ThemeContext";

interface UseThemeResult {
	toggleTheme: (th: Themes) => void;
	theme: Themes
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext)

	const toggleTheme = (th: Themes) => {
		let newTheme: Themes
		switch (theme) {
		case Themes.LIGHT:
			newTheme = Themes.DARK
			break;
		case Themes.DARK:
			newTheme = Themes.ORANGE
			break;
		case Themes.ORANGE:
			newTheme = Themes.LIGHT
			break;
		default:
			newTheme = Themes.LIGHT
		}
		setTheme?.(newTheme)
		// функция может быть undefined тк context инициализируется не сразу
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
	}

	return { 
		theme: theme || Themes.LIGHT, 
		toggleTheme 
	}
}