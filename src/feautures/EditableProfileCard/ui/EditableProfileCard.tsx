import { classNames } from "@/shared/lib/classNames/classNames"
import { ProfileCard } from "@/entities/Profile";
import cls from "./EditableProfileCard.module.scss"
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getProfileForm } from "../model/selectors/getProfileForm/getProfileForm";
import { getProfileError } from "../model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileReadonly } from "../model/selectors/getProfileReadonly/getProfileReadonly";
import { useCallback, useMemo } from "react";
import { fetchProfileData } from "../model/services/fetchProfileData/fetchProfileData";
import { editableProfileActions, editableProfileReducer } from "../model/slice/editableProfileSlice";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import React from "react"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ValidateProfileError } from "../model/consts/validateProfileError";
import { getProfileValidateErrors } from "../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { Text, TextTheme } from "@/shared/ui/Text";
import { EditableProfilePageHeader } from "./EditableProfileCardHeader/EditableProfileCardHeader";

interface EditableProfileCardProps {
	className?: string;
	userId?: string;
}

const reducers: ReducersList = {
	editableProfile: editableProfileReducer
}

const checkNumberReg = new RegExp('^[0-9]+$');

export const EditableProfileCard = (props: EditableProfileCardProps) => {

	const {
		className,
		userId
	} = props

	const { t } = useTranslation("profile")
	const dispatch = useAppDispatch()
	const formData = useSelector(getProfileForm)
	const error = useSelector(getProfileError)
	const isLoading = useSelector(getProfileIsLoading)
	const readonly = useSelector(getProfileReadonly)
	const validateErrors = useSelector(getProfileValidateErrors)

	const validateTranslate: Record<ValidateProfileError, string> = useMemo(() => {
		return {
			[ValidateProfileError.INCORRECT_AGE]: t("Некорректный возраст"),
			[ValidateProfileError.INCORRECT_COUNTRY]: t("Некорректная страна"),
			[ValidateProfileError.INCORRECT_USER_DATA]: t("Некорректныые имя и фамилия"),
			[ValidateProfileError.NO_DATA]: t("Нет данных"),
			[ValidateProfileError.SERVER_ERROR]: t("Ошибка сервера")
		}
	}, [t])

	useInitialEffect(() => {
		if (userId) {
			dispatch(fetchProfileData(userId))
		}
		
		return () => {
			editableProfileActions.setReadonly(false)
		}
	}, [])	

	const onChangeFirstname = useCallback((value?: string) => {
		dispatch(editableProfileActions.updateProfile({firstname: value || ""}))
	}, [dispatch])

	const onChangeLastname = useCallback((value?: string) => {
		dispatch(editableProfileActions.updateProfile({lastname: value || ""}))
	}, [dispatch])

	const onChangeAge = useCallback((value?: number) => {
		if (checkNumberReg.test(String(value))) dispatch(editableProfileActions.updateProfile({age: Number(value || 0)}))
		if (!value) dispatch(editableProfileActions.updateProfile({age: 0}))
	}, [dispatch])

	const onChangeCity = useCallback((value?: string) => {
		dispatch(editableProfileActions.updateProfile({city: value || ""}))
	}, [dispatch])

	const onChangeAvatar = useCallback((value?: string) => {
		dispatch(editableProfileActions.updateProfile({avatar: value || ""}))
	}, [dispatch])

	const onChangeUsername = useCallback((value?: string) => {
		dispatch(editableProfileActions.updateProfile({username: value || ""}))
	}, [dispatch])

	const onChangeCurrency = useCallback((currency: Currency) => {
		dispatch(editableProfileActions.updateProfile({currency: currency}))
	}, [dispatch])

	const onChangeCountry = useCallback((country: Country) => {
		dispatch(editableProfileActions.updateProfile({country: country}))
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<EditableProfilePageHeader/>
			{validateErrors?.length && validateErrors.map(err => {
				return (
					<Text
						key={err}
						text={validateTranslate[err]}
						theme={TextTheme.ERROR}
						data-testid="EditableProfileCard.Error"
					/>
				)
			})}
			<div className = {classNames(cls.ProfileCard, {}, [className])}>
				<ProfileCard
					readonly={readonly}
					data={formData}
					error={error}
					isLoading={isLoading}
					onChangeFirstname={onChangeFirstname}
					onChangeLastname={onChangeLastname}
					onChangeAge={onChangeAge}
					onChangeCity={onChangeCity}
					onChangeAvatar={onChangeAvatar}
					onChangeUsername={onChangeUsername}
					onChangeCurrency={onChangeCurrency}
					onChangeCountry={onChangeCountry}
				/>
			</div>
		</DynamicModuleLoader>
	)
}