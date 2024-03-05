import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import React, { useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginFormActions } from "../../model/slice/loginFormSlice";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "../..//model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text"

interface LoginFormProps {
	className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {

	const { t } = useTranslation("navbar")
	const dispatch = useDispatch()
	const { username, password, isLoading, error } = useSelector(getLoginState)

	const onChangeUsername = useCallback((value: string) => {
		dispatch(loginFormActions.setUsername(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginFormActions.setPassword(value))
	}, [dispatch])

	const onLogin = useCallback(() => {
		dispatch(loginByUsername({ password, username }))
		// передали асинхронный action
	}, [dispatch, password, username])

	return (
		<div 
			className = {classNames(cls.LoginForm, {}, [className])}
		>
			<Text
				title = {t("Форма авторизации")}
				className = {cls.formTitle}
			/>
			{error && <Text text = {t(error)} theme = {TextTheme.ERROR} />}
			<Input 
				autoFocus
				type="text" 
				className = {cls.input}
				placeholder = {t("Введите username")}
				onChange = {onChangeUsername}
				value = {username}
			/>
			<Input 
				type="text"
				className = {cls.input}
				placeholder = {t("Введите пароль")}
				onChange = {onChangePassword}
				value = {password}
			/>
			<Button 
				className = {cls.loginBtn}
				theme = {ButtonTheme.OUTLINE_INVERTED}
				onClick = {onLogin}
				disabled = {isLoading}
				hovered
			>
				{t("Войти")}
			</Button>
		</div>
	)
})