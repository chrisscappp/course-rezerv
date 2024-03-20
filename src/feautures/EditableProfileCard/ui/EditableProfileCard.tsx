import { classNames } from "shared/lib/classNames/classNames"
import { ProfileCard } from "enitites/Profile";
import cls from "./EditableProfileCard.module.scss"
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getProfileForm } from "../model/selectors/getProfileForm/getProfileForm";
import { getProfileError } from "../model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileReadonly } from "../model/selectors/getProfileReadonly/getProfileReadonly";
import { useCallback, useEffect } from "react";
import { fetchProfileData } from "enitites/Profile";
import { editableProfileActions } from "../model/slice/editableProfileSlice";
import { Currency } from "enitites/Currency";
import { Country } from "enitites/Country";

interface EditableProfileCardProps {
	className?: string;
}

const checkNumberReg = new RegExp('^[0-9]+$');

export const EditableProfileCard = (props: EditableProfileCardProps) => {

	const {
		className
	} = props

	const { t } = useTranslation("profile")
	const dispatch = useAppDispatch()
	const formData = useSelector(getProfileForm)
	const error = useSelector(getProfileError)
	const isLoading = useSelector(getProfileIsLoading)
	const readonly = useSelector(getProfileReadonly)

	useEffect(() => {
		dispatch(fetchProfileData())
	}, [dispatch])	

	const onChangeFirstname = useCallback((value?: string) => {
		dispatch(editableProfileActions.updateProfile({firstname: value || ""}))
	}, [dispatch])

	const onChangeLastname = useCallback((value?: string) => {
		dispatch(editableProfileActions.updateProfile({lastname: value || ""}))
	}, [dispatch])

	const onChangeAge = useCallback((value?: number) => {
		//@ts-ignore
		if (checkNumberReg.test(value)) dispatch(editableProfileActions.updateProfile({age: Number(value || 0)}))
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
		<div className = {classNames(cls.ProfileCard, {}, [className])}>
			<ProfileCard
				readonly = {readonly}
				data = {formData}
				error = {error}
				isLoading = {isLoading}
				onChangeFirstname = {onChangeFirstname}
				onChangeLastname = {onChangeLastname}
				onChangeAge = {onChangeAge}
				onChangeCity = {onChangeCity}
				onChangeAvatar = {onChangeAvatar}
				onChangeUsername = {onChangeUsername}
				onChangeCurrency = {onChangeCurrency}
				onChangeCountry = {onChangeCountry}
			/>
		</div>
	)
}