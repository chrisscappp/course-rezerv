import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ThemeSwitcher.module.scss"
import { useTheme, Themes } from "app/providers/ThemeProvider";
import LightIcon from "shared/assets/icons/theme-light.svg"
import DarkIcon from "shared/assets/icons/theme-dark.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button";

interface ThemeSwitcherProps {
	className?: string;
} // доп класс

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {

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
}