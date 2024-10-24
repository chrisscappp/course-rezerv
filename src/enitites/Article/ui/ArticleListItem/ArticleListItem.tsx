import { HTMLAttributeAnchorTarget, memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { Article, ArticleBlockText, ArticleBlockType, ArticleView } from "../../model/types/article";
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import { Card } from "shared/ui/Card/Card";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { AppLink } from "shared/ui/AppLink/AppLink";

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView,
	target?: HTMLAttributeAnchorTarget 
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {

	const {
		className,
		article,
		view = ArticleView.TILE,
		target
	} = props

	const { t } = useTranslation("article")

	const types = <Text text = {article.type.join(", ")} className = {cls.types}/>
	const views = (
		<>
			<Text text = {String(article.views)} className = {cls.views}/>
			<Icon Svg={EyeIcon} className = {cls.eyeIcon}/>
		</>
	)

	if (view === ArticleView.TILE_DETAIL) {
		
		let textBlock = (
			article.blocks.find(block => block.type === ArticleBlockType.TEXT)
		) as ArticleBlockText

		return (
			<div
				className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
			>
				<Card>
					<div className={cls.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={cls.username} />
						<Text text={article.createdAt} className={cls.date} />
					</div>
					<Text title={article.title} className={cls.title} />
					{types}
					<img src={article.img} className={cls.img} alt={article.title} />
					{textBlock && (
						<ArticleTextBlockComponent
							block={textBlock}
							className={cls.textBlock}
						/>
					)}
					<div className={cls.footer}>
						<AppLink 
							to={RouterPath.articles_details + article.id}
							target = {target}
						>
							<Button theme={ButtonTheme.OUTLINE_INVERTED}>
								{t("Читать далее")}
							</Button>
						</AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<AppLink 
			target = {target}
			className = {classNames(cls.ArticleListItem, {}, [className, cls[view]])}
			to={RouterPath.articles_details + article.id}
		>
			<Card>
				<div className = {cls.imageWrapper}>
					<img 
						src={article.img} 
						className = {cls.img} 
						alt = {article.title}
					/>
					<Text
						text = {article.createdAt}
						className = {cls.date}
					/>
				</div>
				<div className = {cls.infoWrapper}>
					{types}
					{views}
				</div>
				<Text
					text = {article.title}
					className = {cls.title}
				/>
			</Card>
		</AppLink>
	)
})