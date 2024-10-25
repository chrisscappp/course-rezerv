import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPageFilters.module.scss";
import {
	ArticleSortSelector,
	ArticleSortType,
	ArticleView,
	ArticleViewSelector,
	ArticleType
} from "entities/Article";
import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getArticlesPageView } from "../../model/selectors/getArticlesPageView/getArticlesPageView";
import { useTranslation } from "react-i18next";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { 
	getArticlesPageOrder, 
	getArticlesPageSearch, 
	getArticlesPageSort, 
	getArticlesPageType
} from "../../model/selectors/articlesPageSelectors";
import { SortOrder } from "shared/types";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import { TabItem } from "shared/ui/Tabs/Tabs";
import { ArticleTypeTabs } from "feautures/ArticleTypeTabs";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const view = useSelector(getArticlesPageView)
	const sort = useSelector(getArticlesPageSort)
	const order = useSelector(getArticlesPageOrder)
	const searchValue = useSelector(getArticlesPageSearch);
	const type = useSelector(getArticlesPageType)
	const { t } = useTranslation();

	const fetchData = useCallback(() => {
		dispatch(fetchArticlesList({replace: true}))
	}, [dispatch])

	const debouncedFetchData = useDebounce(fetchData, 500);

	const onChangeView = useCallback((newView: ArticleView) => {
		if (view !== newView) {
			dispatch(articlesPageActions.setView(newView));
		}
	}, [dispatch, view])

	const onChangeOrder = useCallback((newOrder: SortOrder) => {
		dispatch(articlesPageActions.setOrder(newOrder));
		dispatch(articlesPageActions.setPage(1));
		fetchData()
	}, [dispatch, fetchData])

	const onChangeSort = useCallback((newSort: ArticleSortType) => {
		dispatch(articlesPageActions.setSort(newSort));
		dispatch(articlesPageActions.setPage(1));
		fetchData()
	}, [dispatch, fetchData])

	const onChangeSearch = useCallback((value: string) => {
		dispatch(articlesPageActions.setSearch(value));
		dispatch(articlesPageActions.setPage(1));
		debouncedFetchData()
	}, [debouncedFetchData, dispatch])

	const onChangeArticleType = useCallback((tab: TabItem<ArticleType>) => {
		dispatch(articlesPageActions.setType(tab.value));
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData])

	// декомпозировать всё на фичи со своим стейтом и тд
	return (
		<div className={classNames(cls.ArticlePageFilters, {}, [className])}>
			<div className = {cls.sortWrapper}>
				<ArticleSortSelector
					order = {order}
					sort = {sort}
					onChangeOrder = {onChangeOrder}
					onChangeSortType = {onChangeSort}
				/>
				<ArticleViewSelector
					view={view ? view : ArticleView.TILE_DETAIL}
					onViewClick={onChangeView}
				/>
			</div>
			<Card className = {cls.search}>
				<Input
					placeholder = {t('Поиск')}
					value = {searchValue}
					onChange = {onChangeSearch}
				/>
			</Card>
			<ArticleTypeTabs
				className = {cls.types}
				onChangeArticleType = {onChangeArticleType}
				value = {type}
			/>
		</div>
	);
})
