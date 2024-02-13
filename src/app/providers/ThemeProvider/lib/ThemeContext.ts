import { createContext } from "react";

export enum Themes {
	LIGHT = "light",
	DARK = "dark",
	RED = "red",
}

export interface IThemeContextProps {
	theme?: Themes;
	setTheme?: (theme: Themes) => void;
}

export const ThemeContext = createContext<IThemeContextProps>({})
export const LOCAL_STORAGE_THEME_KEY = "theme"
