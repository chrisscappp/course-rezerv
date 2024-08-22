import { memo } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import React from "react"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { editableProfileReducer, EditableProfileCard, getProfileValidateErrors } from "feautures/EditableProfileCard";
import { useSelector } from "react-redux";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { ValidateProfileError } from "feautures/EditableProfileCard/model/types/editableProfile";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";

interface ProfilePageProps {
	className?: string;
}

const reducers: ReducersList = {
	editableProfile: editableProfileReducer
}

const ProfilePage = ({ className }: ProfilePageProps) => {

	const { t } = useTranslation("profile")
	const validateErrors = useSelector(getProfileValidateErrors)
	const {id: userId} = useParams<{ id: string }>()

	const validateTranslate: Record<ValidateProfileError, string> = {
		[ValidateProfileError.INCORRECT_AGE]: t("Некорректный возраст"),
		[ValidateProfileError.INCORRECT_COUNTRY]: t("Некорректная страна"),
		[ValidateProfileError.INCORRECT_USER_DATA]: t("Некорректныые имя и фамилия"),
		[ValidateProfileError.NO_DATA]: t("Нет данных"),
		[ValidateProfileError.SERVER_ERROR]: t("Ошибка сервера"),
	}

	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			<Page className = {classNames("", {}, [className])}>
				<ProfilePageHeader/>
				{validateErrors?.length && validateErrors.map(err => {
					return (
						<Text
							key = {err}
							text = {validateTranslate[err]}
							theme = {TextTheme.ERROR}
						/>
					)
				})}
				<EditableProfileCard
					userId = {userId}
				/>
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(ProfilePage)