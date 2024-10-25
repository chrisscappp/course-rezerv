import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ProfilePageHeader.module.scss"
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { 
	getProfileData, 
	getProfileForm, 
	getProfileReadonly, 
	updateProfileData,
	editableProfileActions
} from "feautures/EditableProfileCard"
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import React, { useCallback } from "react";
import { getUserAuthData } from "entities/User";

interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {

	const { t } = useTranslation("profile")
	const readonly = useSelector(getProfileReadonly)
	const formData = useSelector(getProfileForm)
	const data = useSelector(getProfileData)
	const dispatch = useAppDispatch()
	const authData = useSelector(getUserAuthData)
	const canEdit = data?.id === authData?.id

	const onEdit = useCallback(() => {
		dispatch(editableProfileActions.setReadonly(false))
	}, [dispatch])

	const onCancelEdit = useCallback(() => {
		dispatch(editableProfileActions.cancelEdit())
	}, [dispatch])

	const onSave = useCallback(() => {
		if (JSON.stringify(formData) !== JSON.stringify(data)) {
			dispatch(updateProfileData())
		}
	}, [data, dispatch, formData])

	return (
		<div className = {classNames(cls.ProfilePageHeader, {}, [className])}>
			<Text title = {t("Профиль")}/>
			{canEdit && (
				<div className = {cls.btnsWrap}>
					{
						readonly ? (
							<Button 
								theme = {ButtonTheme.OUTLINE_INVERTED}
								className = {cls.editBtn}
								onClick = {onEdit}
							>
								{t("Редактировать")}
							</Button>
						)
							:
							(
								<>
									<Button 
										theme = {ButtonTheme.OUTLINE_RED}
										className = {cls.editBtn}
										onClick = {onCancelEdit}
									>
										{t("Отменить изменения")}
									</Button>
									<Button 
										theme = {ButtonTheme.OUTLINE_INVERTED}
										className = {cls.saveBtn}
										onClick = {onSave}
									>
										{t("Сохранить")}
									</Button>
								</>
							)
					}
				</div>
			)}
		</div>	
	)
}
