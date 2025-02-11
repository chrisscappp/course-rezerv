import { memo, useCallback } from "react"
import { RatingCard } from "@/entities/Rating"
import { useTranslation } from "react-i18next"
import { useGetArticleRating, useRateArticle } from "../api/articleRatingApi"
import { useSelector } from "react-redux"
import { getUserAuthData } from "@/entities/User"
import { Skeleton } from "@/shared/ui/Skeleton"

export interface ArticleRatingProps {
	className?: string,
	articleId?: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
	
	const { className, articleId } = props;

	const authData = useSelector(getUserAuthData)
	const { t } = useTranslation()
	const { data, isLoading } = useGetArticleRating({
		articleId,
		userId: authData?.id
	})
	const [rateArticleMutation] = useRateArticle()

	const onSendFeedback = useCallback((starsCount: number, feedback: string = "") => {
		try {
			rateArticleMutation({
				rate: starsCount,
				articleId,
				userId: authData?.id,
				feedback
			})
		} catch (e: unknown) {
			console.error('err', e)
		}
	}, [articleId, authData?.id, rateArticleMutation])

	const rating = data?.[0]

	if (isLoading) {
		return <Skeleton width={'100%'} height={120}/>
	}

	if (!articleId) {
		return null
	}
	
	return (
		<RatingCard
			hasFeedback
			className={className}
			title={t("Как вам статья?")}
			feedbackTitle={t("Оставьте ваш комментарий")}
			rate={rating?.rate}
			onSendFeedback={onSendFeedback}
		/>
	)
})

export default ArticleRating