import { FC, useMemo, useState } from "react"
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from "../lib/ThemeContext"

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

const ThemeProvider: FC = ({ children }) => {
	
	const [theme, setTheme] = useState<Themes>(defaultTheme)

	const defaultProps = useMemo(() => ({
		theme: theme,
		setTheme: setTheme
	}), [theme]) // мемоизируем переменную в памяти

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
// в этот провайдер будем оборачивать другой компонент
// глобальный доступ с компонента к темам