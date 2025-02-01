import { useTranslation } from "react-i18next"
import { Text } from "@/shared/ui/Text/Text";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData"
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import React, { useCallback } from "react";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/Stack/HStack/HStack";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { editableProfileActions } from "../../model/slice/editableProfileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";

interface EditableProfilePageHeaderProps {
	className?: string;
}

export const EditableProfilePageHeader = ({ className }: EditableProfilePageHeaderProps) => {

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
								data-testid="EditableProfilePageHeader.EditButton"
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
										data-testid="EditableProfilePageHeader.CancelButton"
									>
										{t("Отменить изменения")}
									</Button>
									<Button 
										theme = {ButtonTheme.OUTLINE_INVERTED}
										onClick = {onSave}
										data-testid="EditableProfilePageHeader.SaveButton"
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
