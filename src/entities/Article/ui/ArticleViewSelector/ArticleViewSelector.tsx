import React, { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleViewSelector.module.scss"
import { ArticleView } from "../../model/types/article";
import TileIcon from "shared/assets/icons/tile__icon.svg"
import TileDetailIcon from "shared/assets/icons/tile-detail__icon.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView,
	onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
	{ view: ArticleView.TILE, Icon: TileIcon },
	{ view: ArticleView.TILE_DETAIL, Icon: TileDetailIcon }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {

	const {
		className,
		view,
		onViewClick
	} = props

	return (
		<div className = {classNames(cls.ArticleViewSelector, {}, [className])}>
			{viewTypes.map(viewType => (
				<Button 
					key = {viewType.view} 
					theme = {ButtonTheme.CLEAR}
					onClick = {() => onViewClick?.(viewType.view)}
				>
					<Icon
						className = {classNames("", {[cls.selected]: view !== viewType.view})}
						Svg = {viewType.Icon}
					/>
				</Button>
			))}
		</div>
	)
})