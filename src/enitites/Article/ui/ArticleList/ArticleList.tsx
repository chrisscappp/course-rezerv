import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

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

	const { t } = useTranslation()

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

	if (!isLoading && !articles.length) {
		return (
			<div className = {classNames(cls.emptyList, {}, [])}>
				<Text
					title = {t("Статьи не найдены...")}
				/>
			</div>
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