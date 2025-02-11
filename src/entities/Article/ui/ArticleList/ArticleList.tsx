import { HTMLAttributeAnchorTarget, memo } from "react"
import cls from "./ArticleList.module.scss";
import { Article } from "../../model/types/article";
import { ArticleView } from "../../model/consts/article";
import { ArticleListItem } from "../../ui/ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text } from "@/shared/ui/Text";
import { useTranslation } from "react-i18next";
import { HStack } from "@/shared/ui/Stack";

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget,
	virtualized?: boolean
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
		view = ArticleView.TILE,
		target,
		virtualized = true
	} = props

	const { t } = useTranslation()

	if (!isLoading && !articles.length) {
		return (
			<HStack gap="32" max justify="center">
				<Text
					title = {t("Статьи не найдены...")}
				/>
			</HStack>
		)
	}

	if (isLoading) {
		return <>{getSkeletons(view)}</>
	}

	return (
		<>
			{articles.map(article => (
				<ArticleListItem
					article={article}
					view={view}
					key={article.id}
					target={target}
					className={cls.card}	
				/>
			))}
		</>
	)
})