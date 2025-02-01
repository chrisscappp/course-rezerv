import { memo } from "react"
import { classNames } from "@/shared/lib/classNames/classNames"
import { VStack } from "@/shared/ui/Stack"
import { ArticleList, ArticleView } from "@/entities/Article"
import { Text, TextSize } from "@/shared/ui/Text/Text"
import { useTranslation } from "react-i18next"
import { useArticleRecomendationsList } from "../api/articleRecomendationsApi"

interface ArticleRecomendationsListProps {
	className?: string
}

export const ArticleRecomendationsList = memo((props: ArticleRecomendationsListProps) => {
	
	const { className } = props

	const { t } = useTranslation("article-details")

	const { isLoading, error, data: recomendations } = useArticleRecomendationsList(3)

	if (isLoading || error || !recomendations) {
		return null
	}
	
	return (
		<VStack max gap="8" className={classNames('', {}, [className])}>
			<Text
				size={TextSize.L}
				title={t("Рекомендуем")}
			/>
			<ArticleList
				articles={recomendations}
				view={ArticleView.TILE}
				isLoading={isLoading}
				target="_blank"
				virtualized={false}
			/>
		</VStack>
	)
})