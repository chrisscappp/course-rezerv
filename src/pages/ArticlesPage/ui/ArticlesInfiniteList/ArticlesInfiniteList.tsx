import { ArticleList } from "entities/Article"
import { getArticlesPageError } from "../../model/selectors/getArticlesPageError/getArticlesPageError"
import { getArticlesPageIsLoading } from "../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading"
import { getArticlesPageView } from "../../model/selectors/getArticlesPageView/getArticlesPageView"
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage"
import { getArticles } from "../../model/slices/articlesPageSlice"
import { memo } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useTranslation } from "react-i18next"
import { Text } from "shared/ui/Text/Text"

interface ArticlesInfiniteListProps {
	className?: string
}

export const ArticlesInfiniteList = memo(({ className }: ArticlesInfiniteListProps) => {

	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const articles = useSelector(getArticles.selectAll)
	const isLoading = useSelector(getArticlesPageIsLoading)
	const error = useSelector(getArticlesPageError)
	const view = useSelector(getArticlesPageView)
	const [searchParams] = useSearchParams()

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams))
	}, [])
	// несколько action, какие-то условия или бизнес логика - выносим в отдельный сервис

	if (error) {
		return <Text text={t(error)}/>
	}

	return (
		<ArticleList
			view={view}
			articles={articles}
			isLoading={isLoading}
			className={className}
		/>
	)
})