import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./NotificationList.module.scss"
import { useNotifications } from "../../api/notficationApi"
import { VStack } from "shared/ui/Stack"
import { NotificationItem } from "../NotificationItem/NotificationItem"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"

interface NotificationListProps {
	className?: string
}

export const NotificationList = memo((props: NotificationListProps) => {
	
	const { className } = props
	const { data, isLoading, error } = useNotifications(null, {
		pollingInterval: 10000
	})

	if (isLoading) {
		return (
			<VStack
			    className={classNames(cls.NotificationList, {}, [className])}
				gap="16"
			>
				<Skeleton width={"100%"} border={"8px"} height={"80px"}/>
				<Skeleton width={"100%"} border={"8px"} height={"80px"}/>
				<Skeleton width={"100%"} border={"8px"} height={"80px"}/>
			</VStack>
		)
	}
	
	return (
		<VStack 
			className={classNames(cls.NotificationList, {}, [className])}
			gap="16"
		>
			{data?.map(notification => (
				<NotificationItem
					key={`notification-item-${notification.id}`}
					item={notification}
				/>
			))}
		</VStack>
	)
})