import { Themes } from "../../../consts/theme";
import { createContext } from "react";

export interface IThemeContextProps {
  theme?: Themes;
  setTheme?: (theme: Themes) => void;
}

export const ThemeContext = createContext<IThemeContextProps>({})
