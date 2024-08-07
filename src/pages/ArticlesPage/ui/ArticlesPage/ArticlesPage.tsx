import { memo, useCallback } from "react";
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
import { Page } from "shared/ui/Page/Page";
import { fetchNextArticlesPart } from "../../model/services/fetchNextArticlesPart/fetchNextArticlesPart";

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
	
	const { className } = props
	const dispatch = useAppDispatch()
	const articles = useSelector(getArticles.selectAll)
	const isLoading = useSelector(getArticlesPageIsLoading)
	const error = useSelector(getArticlesPageError)
	const view = useSelector(getArticlesPageView)

	useInitialEffect(() => {
		dispatch(articlesPageActions.initState())
		dispatch(fetchArticlesList({
			page: 1
		}))	
	}, [view])

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPart())
	}, [dispatch])

	const onChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setView(view))
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			<Page 
				className = {classNames(cls.ArticlesPage, {}, [className])}
				onScrollEnd = {onLoadNextPart}
			>
				<ArticleViewSelector
					view = {view ? view : ArticleView.TILE_DETAIL}
					onViewClick = {onChangeView}
				/>
				<ArticleList
					view = {view}
					articles = {articles}
					isLoading = {isLoading}
				/>
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)