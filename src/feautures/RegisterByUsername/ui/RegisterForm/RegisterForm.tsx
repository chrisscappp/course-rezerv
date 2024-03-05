import { classNames } from "shared/lib/classNames/classNames"
import cls from "./RegisterForm.module.scss"
import React, { useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextTheme } from "shared/ui/Text/Text"
import { registerByUsername } from "../../model/services/registerByUsername/registerByUsername";
import { getRegisterState } from "../../model/selectors/getRegisterState/getRegisterState";
import { registerFormActions } from "../../model/slice/registerFormSlice";

interface RegisterFormProps {
	className?: string;
}

export const RegisterForm = memo(({ className }: RegisterFormProps) => {

	const { t } = useTranslation("navbar")
	const dispatch = useDispatch()
	const { username, password, repeatPassword, error, isLoading } = useSelector(getRegisterState)

	const onChangeUsername = useCallback((value: string) => {
		dispatch(registerFormActions.setUsername(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(registerFormActions.setPassword(value))
	}, [dispatch])

	const onChangeRepeatPassword = useCallback((value: string) => {
		dispatch(registerFormActions.setRepeatPasword(value))
	}, [dispatch])

	const onRegister = useCallback(() => {
		dispatch(registerFormActions.setError(""))
		if (!(password === repeatPassword)) {
			dispatch(registerFormActions.setError("Пароли не совпадают"))
		} else {
			dispatch(registerByUsername({ id: 3, password, username }))
		}

	}, [dispatch, password, repeatPassword, username])

	return (
		<div 
			className = {classNames(cls.RegisterForm, {}, [className])}
		>
			<Text
				title = {t("Форма регистрации")}
				className = {cls.formTitle}
			/>
			{error && <Text text = {t(error)} theme = {TextTheme.ERROR} />}
			<Input 
				autoFocus
				type="text" 
				className = {cls.input}
				placeholder = {t("Введите username")}
				value = {username}
				onChange = {onChangeUsername}
			/>
			<Input 
				type="text"
				className = {cls.input}
				placeholder = {t("Введите пароль")}
				value = {password}
				onChange = {onChangePassword}
			/>
			<Input 
				type="text"
				className = {cls.input}
				placeholder = {t("Повторите пароль")}
				value = {repeatPassword}
				onChange = {onChangeRepeatPassword}
			/>
			<Button 
				className = {cls.regBtn}
				theme = {ButtonTheme.OUTLINE_INVERTED}
				hovered
				hoveredTheme = {ButtonTheme.ERROR}
				onClick = {onRegister}
				disabled = {isLoading}
			>
				{t("Зарегистрироваться")}
			</Button>
		</div>
	)
})