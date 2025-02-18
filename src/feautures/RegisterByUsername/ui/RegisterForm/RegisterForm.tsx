import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./RegisterForm.module.scss"
import React, { useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextTheme } from "@/shared/ui/Text"
import { registerByUsername } from "../../model/services/registerByUsername/registerByUsername";
import { registerFormActions, registerFormReducer } from "../../model/slice/registerFormSlice";
import { getRegisterLogin } from "../../model/selectors/getRegisterLogin/getRegisterLogin";
import { getRegisterPassword } from "../../model/selectors/getRegisterPassword/getRegisterPassword";
import { getRegisterRepeatPassword } from "../../model/selectors/getRegisterRepeatPassword/getRegisterRepeatPassword";
import { getRegisterIsLoading } from "../../model/selectors/getRegisterIsLoading/getRegisterIsLoading";
import { getRegisterError } from "../../model/selectors/getRegisterError/getRegisterError";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

export interface RegisterFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	registerForm: registerFormReducer
}

const RegisterForm = memo(({ className, onSuccess }: RegisterFormProps) => {

	const { t } = useTranslation("navbar")
	const dispatch = useAppDispatch()
	const username = useSelector(getRegisterLogin)
	const password = useSelector(getRegisterPassword)
	const repeatPassword = useSelector(getRegisterRepeatPassword)
	const error = useSelector(getRegisterError)
	const isLoading = useSelector(getRegisterIsLoading)

	const onChangeUsername = useCallback((value: string) => {
		dispatch(registerFormActions.setUsername(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(registerFormActions.setPassword(value))
	}, [dispatch])

	const onChangeRepeatPassword = useCallback((value: string) => {
		dispatch(registerFormActions.setRepeatPasword(value))
	}, [dispatch])

	const onRegister = useCallback(async () => {
		dispatch(registerFormActions.setError(""))
		if (!(password === repeatPassword)) {
			dispatch(registerFormActions.setError("Пароли не совпадают"))
		} else {
			if (password && username) {
				const res = await dispatch(registerByUsername({ id: "3", password, username }))
				if (res.meta.requestStatus === "fulfilled") {
					onSuccess()
					// явно закрыли модалку после регистрации
				}
			}
		}
	}, [dispatch, onSuccess, password, repeatPassword, username])

	return (
		<DynamicModuleLoader
			reducers = {initialReducers}
			removeAfterUnmount
		>
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
					value = {username ? username : ""}
					onChange = {onChangeUsername}
				/>
				<Input 
					type="text"
					className = {cls.input}
					placeholder = {t("Введите пароль")}
					value = {password ? password : ""}
					onChange = {onChangePassword}
				/>
				<Input 
					type="text"
					className = {cls.input}
					placeholder = {t("Повторите пароль")}
					value = {repeatPassword ? repeatPassword : ""}
					onChange = {onChangeRepeatPassword}
				/>
				<Button 
					className = {cls.regBtn}
					theme = {ButtonTheme.OUTLINE_INVERTED}
					hovered
					hoveredTheme = {ButtonTheme.ERROR}
					onClick = {onRegister}
					disabled = {isLoading ? isLoading : false}
				>
					{t("Зарегистрироваться")}
				</Button>
			</div>
		</DynamicModuleLoader>
	)
})

export default RegisterForm