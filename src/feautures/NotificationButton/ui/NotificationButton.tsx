import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Icon } from "shared/ui/Icon/Icon"
import { Popover } from "shared/ui/Popups"
import NotificationIcon from "shared/assets/icons/notifications-64-64.svg"
import cls from "./NotificationButton.module.scss"
import { NotificationList } from "entities/Notification"

interface NotificationButtonProps {
	className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
	return (
		<Popover trigger={(
			<Button theme={ButtonTheme.CLEAR}>
				<Icon Svg={NotificationIcon} inverted/>
			</Button>
		)} className={className}>
			<NotificationList className={cls.notifications}/>
		</Popover>
	)
}