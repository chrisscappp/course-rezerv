import { classNames } from "shared/lib/classNames/classNames"
import cls from "./LoginForm.module.scss"
import React, { useCallback, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginFormActions, loginFormReducer } from "../../model/slice/loginFormSlice";
import { loginByUsername } from "../..//model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text"
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"

export interface LoginFormProps {
	className?: string;
}

const initialReducers: ReducersList = {
	loginForm: loginFormReducer
}

const LoginForm = memo(({ className }: LoginFormProps) => {

	const { t } = useTranslation("navbar")
	const dispatch = useDispatch()
	const username = useSelector(getLoginUsername)
	const password = useSelector(getLoginPassword)
	const error = useSelector(getLoginError)
	const isLoading = useSelector(getLoginIsLoading)

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
		<DynamicModuleLoader 
			reducers={initialReducers}
			removeAfterUnmount
		>
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
					value = {username ? username : ""}
				/>
				<Input 
					type="text"
					className = {cls.input}
					placeholder = {t("Введите пароль")}
					onChange = {onChangePassword}
					value = {password ? password : ""}
				/>
				<Button 
					className = {cls.loginBtn}
					theme = {ButtonTheme.OUTLINE_INVERTED}
					onClick = {onLogin}
					disabled = {isLoading ? isLoading : false}
					hovered
				>
					{t("Войти")}
				</Button>
			</div>
		</DynamicModuleLoader>
	)
})

export default LoginForm