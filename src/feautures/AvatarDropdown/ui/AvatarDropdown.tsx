import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User"
import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Avatar } from "@/shared/ui/Avatar/Avatar"
import { Dropdown } from "@/shared/ui/Popups"
import { RouterPath } from "@/shared/consts/router"

interface AvatarDropdownProps {
	className?: string
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
	
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const authData = useSelector(getUserAuthData)
	const isAdmin = useSelector(isUserAdmin)
	const isManager = useSelector(isUserManager)
	const isAdminPanelAvailable = isAdmin || isManager

	const onLogout = useCallback(() => {
		dispatch(userActions.logout())
	}, [dispatch])

	if (!authData) return null
	
	return (
		<Dropdown
			className={className}
			items={[
				...(isAdminPanelAvailable ? [{
					content: t("Админка"),
					href: RouterPath.admin_panel
				}] : []),
				{
					content: t("Профиль"),
					href: RouterPath.profile + authData.id
				},
				{
					content: t("Выйти"),
					onClick: onLogout
				}
			]}
			trigger={<Avatar size={30} src={authData.avatar}/>}
			direction="bottom left"
		/>
	)
})