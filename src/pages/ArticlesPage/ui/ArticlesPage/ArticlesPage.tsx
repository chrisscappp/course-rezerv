import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./ArticlesPage.module.scss"
import { ArticleList } from "enitites/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageReducer, getArticles } from "../../model/slices/articlesPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useSelector } from "react-redux";
import { getArticlesPageIsLoading } from "../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading";
import { getArticlesPageError } from "../../model/selectors/getArticlesPageError/getArticlesPageError";
import { getArticlesPageView } from "../../model/selectors/getArticlesPageView/getArticlesPageView";
import { Page } from "widgets/Page/Page";
import { fetchNextArticlesPart } from "../../model/services/fetchNextArticlesPart/fetchNextArticlesPart";
import { initArticlesPage } from "pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { useSearchParams } from "react-router-dom";
import { ArticleListItem } from "enitites/Article/ui/ArticleListItem/ArticleListItem";

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
	const [searchParams] = useSearchParams()

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	}, [])
	// несколько action, какие-то условия или бизнес логика - выносим в отдельный сервис

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPart())
	}, [dispatch])

	const itemContent = (index: number) => {
		return <ArticleListItem article={articles[index]} view={view}/>
	}

	return (
		<DynamicModuleLoader reducers = {reducers}>
			<Page 
				className = {classNames(cls.ArticlesPage, {}, [className])}
				onScrollEnd = {onLoadNextPart}
				saveScroll
			>
				<ArticlesPageFilters/>
				<ArticleList
					className = {cls.list}
					view = {view}
					articles = {articles}
					isLoading = {isLoading}
				/>
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)