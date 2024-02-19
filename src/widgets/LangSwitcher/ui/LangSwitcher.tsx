import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LangSwitcher.module.scss"
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import React from "react";

interface LangSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggleLanguage = async () => {
		i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
	}

	return (
		<Button 
			theme = {ButtonTheme.CLEAR} 
			onClick = {toggleLanguage}
			className = {classNames(cls.LangSwitcher, {}, [className])}
		>
			{t(short ? "Короткий язык" : "Язык")}
		</Button>	
	)
}