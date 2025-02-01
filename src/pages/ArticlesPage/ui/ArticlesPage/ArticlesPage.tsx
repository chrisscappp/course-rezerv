import { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames"
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageReducer } from "../../model/slices/articlesPageSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Page } from "@/widgets/Page/Page";
import { fetchNextArticlesPart } from "../../model/services/fetchNextArticlesPart/fetchNextArticlesPart";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { ArticlesInfiniteList } from "../ArticlesInfiniteList/ArticlesInfiniteList";
import cls from "./ArticlesPage.module.scss"

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
	
	const { className } = props
	const dispatch = useAppDispatch()

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPart())
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers = {reducers}>
			<Page 
				className={classNames(cls.ArticlesPage, {}, [className])}
				onScrollEnd={onLoadNextPart}
				saveScroll
			>
				<ArticlesPageFilters/>
				<ArticlesInfiniteList/>
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(ArticlesPage)