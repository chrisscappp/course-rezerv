import { memo } from "react"
import { classNames } from "@/shared/lib/classNames/classNames"
import React from "react"
import { EditableProfileCard } from "@/feautures/EditableProfileCard"
import { useParams } from "react-router-dom"
import { Page } from "@/widgets/Page/Page"
import { VStack } from "@/shared/ui/Stack"
import { useTranslation } from "react-i18next"
import { Text } from "@/shared/ui/Text"

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {

	const { id: userId } = useParams<{ id: string }>()
	const { t } = useTranslation("profile")

	if (!userId) {
		return <Text text={t("Пользователь не найден")}/>
	}

	return (
		<Page className = {classNames("", {}, [className])}>
			<VStack max gap="16">
				<EditableProfileCard userId = {userId}/>
			</VStack>
		</Page>
	)
}

export default memo(ProfilePage)