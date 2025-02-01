import React, { memo, useCallback, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleDetails.module.scss"
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "../../model/slice/articleSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useSelector } from "react-redux";
import { 
	getArticleDetailsData, 
	getArticleDetailsError, 
	getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetailsSelector";
import { Text, TextAlign, TextSize } from "@/shared/ui/Text/Text";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import EyeIcon from "@/shared/assets/icons/eye-icon.svg"
import CalendarIcon from "@/shared/assets/icons/calendar-icon.svg"
import { Icon } from "@/shared/ui/Icon/Icon";
import { ArticleBlock } from "../../model/types/article";
import { ArticleBlockType } from "../../model/consts/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer
}

// с данными работаем внутри изолированного модуля
export const ArticleDetails = memo((props: ArticleDetailsProps) => {

	const {
		className,
		id
	} = props

	const dispatch = useAppDispatch()
	const article = useSelector(getArticleDetailsData)
	const error = useSelector(getArticleDetailsError)
	const isLoading = useSelector(getArticleDetailsIsLoading)

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
		case ArticleBlockType.CODE:
			return <ArticleCodeBlockComponent key = {block.id} className = {cls.block} block = {block}/>
		case ArticleBlockType.IMAGE:
			return <ArticleImageBlockComponent key = {block.id} className = {cls.block} block = {block}/>
		case ArticleBlockType.TEXT:
			return <ArticleTextBlockComponent key = {block.id} className = {cls.block} block = {block}/>
		default:
			return null;
		}
	}, [])
	
	useInitialEffect(() => {
		dispatch(fetchArticleById(id))
	}, []) // вынесли хук с проверкой на storybook

	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton className = {cls.avatar} width={200} height={200} border = {"50%"}/>
				<Skeleton className = {cls.title} width={600} height={32}/>
				<Skeleton className = {cls.skeleton} width={400} height={32}/>
				<Skeleton className = {cls.skeleton} width={"100%"} height={200}/>
				<Skeleton className = {cls.skeleton} width={"100%"} height={200}/>
			</>
		)
	} else if (error) {
		content = (
			<Text
				title = {error}
				align = {TextAlign.CENTER}
			/>
		)
	} else {
		content = (
			<>
				<div className = {cls.avatarWrapper}>
					<Avatar size={200} src = {article?.img} className = {cls.avatar}/>
				</div>
				<Text
					title = {article?.title}
					text = {article?.subtitle}
					className = {cls.title}
					size = {TextSize.L}
				/>
				<div className = {cls.withIconWrap}>
					<Icon
						Svg = {EyeIcon}
						className = {cls.icon}
					/>
					<Text text = {String(article?.views)}/>
				</div>
				<div className = {cls.withIconWrap}>
					<Icon
						Svg = {CalendarIcon}
						className = {cls.icon}
					/>
					<Text text = {article?.createdAt}/>
				</div>
				{
					article?.blocks.map(renderBlock)
				}
			</>
		)
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className = {classNames(cls.ArticleDetails, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	)
})