import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./ThemeSwitcher.module.scss"
import LightIcon from "@/shared/assets/icons/theme-light.svg"
import DarkIcon from "@/shared/assets/icons/theme-dark.svg"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import React, { memo } from "react"
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme"
import { Themes } from "@/shared/consts/theme"

interface ThemeSwitcherProps {
	className?: string;
} // доп класс

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {

	const { theme, toggleTheme } = useTheme()

	return (
		<Button 
			theme = {ButtonTheme.CLEAR}
			className = {classNames(cls.ThemeSwitcher, {}, [className])}
			onClick = {() => toggleTheme(Themes.LIGHT)}
		>
			{
				theme === Themes.DARK ? <DarkIcon /> : <LightIcon/>
			}
		</Button>
	)
})