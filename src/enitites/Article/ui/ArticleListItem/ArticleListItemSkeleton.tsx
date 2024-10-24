import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { ArticleView } from "../../model/types/article";
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import { Card } from "shared/ui/Card/Card";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

interface ArticleListItemSkeletonProps {
	className?: string;
	view: ArticleView
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {

	const {
		className,
		view = ArticleView.TILE
	} = props

	const types = <Text className = {cls.types}/>
	const views = (
		<>
			<Text className = {cls.views}/>
			<Icon Svg={EyeIcon} className = {cls.eyeIcon}/>
		</>
	)

	if (view === ArticleView.TILE_DETAIL) {

		return (
			<div className = {classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
				<Card>
					<div className = {cls.header}>
						<Skeleton width={30} height={30} border = {"50%"}/>
						<Skeleton width={150} height={16} className = {cls.username}/>
						<Skeleton width={150} height={16} className = {cls.date}/>
					</div>
					<Skeleton width={250} height={24} className = {cls.title}/>
					<Skeleton width = {"100%"} height={200} className = {cls.img}/>
					<div className = {cls.footer}>
						<Skeleton width={200} height={36}/>
					</div>
				</Card>
			</div>
		)
	}

	return (
		<div className = {classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
			<Card>
				<div className = {cls.imageWrapper}>
					<Skeleton width = {200} height = {200}/>
				</div>
				<div className = {cls.infoWrapper}>
					<Skeleton width = {130} height = {16}/>
				</div>
				<Skeleton width = {150} height = {16}/>
			</Card>
		</div>
	)
})