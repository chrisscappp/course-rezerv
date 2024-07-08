import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticlesPage.module.scss"
import { ArticleList, ArticleView, ArticleViewSelector } from "enitites/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageActions, articlesPageReducer, getArticles } from "../../model/slices/articlesPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { useSelector } from "react-redux";
import { getArticlesPageIsLoading } from "../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading";
import { getArticlesPageError } from "../../model/selectors/getArticlesPageError/getArticlesPageError";
import { getArticlesPageView } from "../../model/selectors/getArticlesPageView/getArticlesPageView";

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
	
	const { className } = props
	const { t } = useTranslation("article")
	const dispatch = useAppDispatch()
	const articles = useSelector(getArticles.selectAll)
	const isLoading = useSelector(getArticlesPageIsLoading)
	const error = useSelector(getArticlesPageError)
	const view = useSelector(getArticlesPageView)

	useInitialEffect(() => {
		dispatch(articlesPageActions.initState())
		dispatch(fetchArticlesList())	
	})

	const onChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setView(view))
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			<div className = {classNames(cls.ArticlesPage, {}, [className])}>
				<ArticleViewSelector
					view = {view ? view : ArticleView.TILE_DETAIL}
					onViewClick = {onChangeView}
				/>
				<ArticleList
					view = {view}
					articles = {articles}
					isLoading = {isLoading}
				/>
			</div>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)