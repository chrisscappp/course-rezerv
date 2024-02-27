import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

interface LoginFormProps {
	className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {

	const { t } = useTranslation("navbar")

	return (
		<div 
			className = {classNames(cls.LoginForm, {}, [className])}
		>
			<Input 
				autoFocus
				type="text" 
				className = {cls.input}
				placeholder = {t("Введите username")}
			/>
			<Input 
				type="text"
				className = {cls.input}
				placeholder = {t("Введите пароль")}
			/>
			<Button 
				className = {cls.loginBtn}
				theme = {ButtonTheme.OUTLINE_INVERTED}
			>
				{t("Войти")}
			</Button>
		</div>
	)
}