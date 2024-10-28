import { useTranslation } from "react-i18next"
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
import { HStack } from "shared/ui/Stack/HStack/HStack";

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
		<HStack max justify="between" className={className}>
			<Text title = {t("Профиль")}/>
			{canEdit && (
				<HStack gap="8">
					{
						readonly ? (
							<Button 
								theme = {ButtonTheme.OUTLINE_INVERTED}
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
										onClick = {onCancelEdit}
									>
										{t("Отменить изменения")}
									</Button>
									<Button 
										theme = {ButtonTheme.OUTLINE_INVERTED}
										onClick = {onSave}
									>
										{t("Сохранить")}
									</Button>
								</>
							)
					}
				</HStack>
			)}
		</HStack>	
	)
}
