import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
	return new Array(view === ArticleView.TILE ? 9 : 3)
		.fill(0)
		.map((_, index) => (
			<ArticleListItemSkeleton
				view = {view}
				key = {index}
				className = {cls.card}
			/>
		))
}

export const ArticleList = memo((props: ArticleListProps) => {

	const {
		className,
		articles,
		isLoading,
		view = ArticleView.TILE
	} = props

	const renderArticle = (article: Article) => {
		return (
			<ArticleListItem
				key = {article.id}
				article = {article}
				view = {view}
				className = {cls.card}
			/>
		)
	}

	return (
		<div className = {classNames(cls.ArticleList, {}, [className, cls[view]])}>
			{articles.length > 0 
				? articles.map(renderArticle)
				: null}
			{isLoading && getSkeletons(view)}
		</div>
	)
})