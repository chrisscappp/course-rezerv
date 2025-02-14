import { HTMLAttributeAnchorTarget, memo } from "react"
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { Article, ArticleBlockText } from "../../model/types/article";
import { ArticleBlockType, ArticleView } from "../../model/consts/article"
import { Text } from "@/shared/ui/Text";
import { Icon } from "@/shared/ui/Icon";
import EyeIcon from "@/shared/assets/icons/eye-icon.svg"
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { AppLink } from "@/shared/ui/AppLink";
import { HStack } from "@/shared/ui/Stack";
import { getRouteArticleDetails } from "@/shared/consts/router";

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
		<HStack gap="4">
			<Text text = {String(article.views)}/>
			<Icon Svg={EyeIcon}/>
		</HStack>
	)

	if (view === ArticleView.TILE_DETAIL) {
		
		let textBlock = (
			article.blocks.find(block => block.type === ArticleBlockType.TEXT)
		) as ArticleBlockText

		return (
			<div
				className={classNames("", {}, [className, cls[view]])}
			>
				<Card>
					<HStack max justify="between">
						<HStack gap="8">
							<Avatar size={30} src={article.user.avatar} />
							<Text text={article.user.username} className={cls.username} />
						</HStack>
						<Text text={article.createdAt} className={cls.date} />
					</HStack>
					<Text title={article.title} className={cls.title} />
					{types}
					<img src={article.img} className={cls.img} alt={article.title} />
					{textBlock && (
						<ArticleTextBlockComponent
							block={textBlock}
							className={cls.textBlock}
						/>
					)}
					<HStack max justify="between" className={cls.footer}>
						<AppLink 
							to={getRouteArticleDetails(article.id)}
							target = {target}
						>
							<Button theme={ButtonTheme.OUTLINE_INVERTED}>
								{t("Читать далее")}
							</Button>
						</AppLink>
						{views}
					</HStack>
				</Card>
			</div>
		);
	}

	return (
		<AppLink 
			target = {target}
			className = {classNames(cls.ArticleListItem, {}, [className, cls[view]])}
			to={getRouteArticleDetails(article.id)}
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
				<HStack justify="between" className={cls.infoWrapper}>
					{types}
					{views}
				</HStack>
				<Text
					text = {article.title}
					className = {cls.title}
				/>
			</Card>
		</AppLink>
	)
})