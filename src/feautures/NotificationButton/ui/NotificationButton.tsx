import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import { Icon } from "@/shared/ui/Icon/Icon"
import { Popover } from "@/shared/ui/Popups"
import NotificationIcon from "@/shared/assets/icons/notifications-64-64.svg"
import cls from "./NotificationButton.module.scss"
import { NotificationList } from "@/entities/Notification"
import { Drawer } from "@/shared/ui/Drawer/Drawer"
import { useCallback, useState } from "react"
import { BrowserView, MobileView } from "react-device-detect"

interface NotificationButtonProps {
	className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
	
	const [isDrawer, setIsDrawer] = useState(false)

	const onOpenDrawer = useCallback(() => {
		setIsDrawer(true);
	}, [])

	const onCloseDrawer = useCallback(() => {
		setIsDrawer(false);
	}, [])

	const trigger = (
		<Button theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
			<Icon Svg={NotificationIcon} inverted/>
		</Button>
	)
	
	return (
		<div>
			<BrowserView>
				<Popover trigger={trigger} className={className}>
					<NotificationList className={cls.notifications}/>
				</Popover>
			</BrowserView>
			<MobileView>
				{trigger}
				<Drawer isOpen={isDrawer} onClose={onCloseDrawer}>
					<NotificationList/>
				</Drawer>
			</MobileView>
			{/* оба компонента под капотом - lazy. ветки с кодом подтягиваются по мере необходимости */}
		</div>
	)
}