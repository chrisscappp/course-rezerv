import { HTMLAttributeAnchorTarget, memo } from "react"
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../../ui/ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { PAGE_ID } from "shared/consts/elementsId";

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget
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
		target
	} = props

	const { t } = useTranslation()
	const isBig = view === ArticleView.TILE_DETAIL
	const itemsPerRow = isBig ? 1 : 3
	const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)
	const rowHeight = isBig ? 750 : 330

	const rowRender = ({index, key, style}: ListRowProps) => {
		// index - индекс элемента
		const items = []
		const fromIndex = index * itemsPerRow
		const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

		for (let i = fromIndex; i < toIndex; i += 1) {
			items.push(
				<ArticleListItem
					key={'str' + i}
					article={articles[i]}
					view={view}
					className={cls.card}
					target={target}
				/>	
			)
		}
		
		return (
			<div
				key={key}
				style={style}
				className={cls.row}
			>
				{items}
			</div>
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

	// window scroller - привязали элемент (обёртку) В КОТОРОМ происходит скролл
	// registerChild - дочерний элемент по отношению к WINDOWSCROLLER
	// onChildScroll - дочерний элемент по отношению к ОБЁРТКЕ registerChild. подписка на скролл
	return (
		<WindowScroller
			scrollElement={document.getElementById(PAGE_ID) as Element}
		>
			{({ width, height, registerChild, onChildScroll, scrollTop }) => (
				<div 
					className={classNames(cls.ArticleList, {}, [className, cls[view]])}
					ref={registerChild}
				>
					<List
						autoHeight
						onScroll={onChildScroll}
						scrollTop={scrollTop}
						height={height ?? 700}
						rowCount={rowCount}
						rowHeight={rowHeight}
						rowRenderer={rowRender}
						width={width ? width - 80 : 700}
					/>
					{isLoading && getSkeletons(view)}
				</div>
			)}
		</WindowScroller>
	)
})