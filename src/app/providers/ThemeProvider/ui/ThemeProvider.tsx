import { ReactNode, useMemo, useState } from "react"
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from "../lib/ThemeContext"
import React from 'react'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

interface ThemeProviderProps {
	initialTheme?: Themes;
	children: ReactNode
}

// в 17 версии у FC по умолчанию был пропс children. сейчас уже не так
const ThemeProvider = (props: ThemeProviderProps) => {
	
	const {
		children,
		initialTheme
	} = props

	const [theme, setTheme] = useState<Themes>(initialTheme || defaultTheme)

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