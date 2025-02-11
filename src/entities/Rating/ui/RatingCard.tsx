import { classNames } from "@/shared/lib/classNames/classNames"
import { Card } from "@/shared/ui/Card"
import { memo, useCallback, useState } from "react"
import { HStack, VStack } from "@/shared/ui/Stack"
import { useTranslation } from "react-i18next"
import { Text } from "@/shared/ui/Text"
import { StarRating } from "@/shared/ui/StarRating"
import { Modal } from "@/shared/ui/Modal"
import { Input } from "@/shared/ui/Input"
import { Button, ButtonTheme } from "@/shared/ui/Button"
import { BrowserView, MobileView } from "react-device-detect"
import { Drawer } from "@/shared/ui/Drawer"

interface RatingCardProps {
	className?: string,
	title?: string,
	feedbackTitle?: string,
	hasFeedback: boolean,
	onSendFeedback?: (starsCount: number, feedback?: string) => void,
	rate?: number
}

// разделяем иконки и их логику в shared. сущность - конкретная карточка с рейтингом
// она отвечает за фидбек, и отдаёт его наружу. максимальная переиспользуемость, как в комментариях
// взаимодействие с внешним миром только по колбэкам. стейт внутренний локальный

export const RatingCard = memo((props: RatingCardProps) => {

	const { 
		className,
		feedbackTitle = "Оставьте комментарий",
		hasFeedback,
		onSendFeedback,
		title = "Оставьте отзыв",
		rate = 0
	} = props

	const { t } = useTranslation()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [starsCount, setStarsCount] = useState(0)
	const [feedback, setFeedback] = useState("")

	const onSelectStar = useCallback((selectedStarsCount: number) => {
		setStarsCount(selectedStarsCount)
		if (hasFeedback) {
			setIsModalOpen(true)
		} else {
			onSendFeedback?.(selectedStarsCount)
		}
	}, [hasFeedback, onSendFeedback])

	const onChangeFeedback = useCallback((value: string) => {
		setFeedback(value)
	}, [])

	const handleSendFeedback = useCallback(() => {
		onSendFeedback?.(starsCount, feedback)
		setIsModalOpen(false)
	}, [feedback, onSendFeedback, starsCount])

	const modalContent = (
		<VStack max gap="16">
			<Text title={t(feedbackTitle)}/>
			<Input 
				placeholder={t("Ваш отзыв")} 
				value={feedback}
				onChange={onChangeFeedback}
			/>
			<HStack max gap="16" justify="end">
				<Button theme={ButtonTheme.OUTLINE_RED} onClick={handleSendFeedback}>{t("Закрыть")}</Button>
				<Button theme={ButtonTheme.OUTLINE_INVERTED} onClick={handleSendFeedback}>{t("Отправить")}</Button>
			</HStack>
		</VStack>
	)

	return (
		<Card className={classNames('', {}, [className])} fullWidth>
			<VStack align="center" gap="8">
				<Text title={t(rate ? 'Спасибо за оценку' : title)}/>
				<StarRating
					size={40}	
					onSelect={onSelectStar}
					selectedStars={rate}
				/>
			</VStack>
			<BrowserView>
				<Modal isOpen={isModalOpen} lazy>
					{modalContent}
				</Modal>
			</BrowserView>
			<MobileView>
				<Drawer isOpen={isModalOpen} lazy onClose={handleSendFeedback}>
					{modalContent}
				</Drawer>
			</MobileView>
		</Card>
	)
})