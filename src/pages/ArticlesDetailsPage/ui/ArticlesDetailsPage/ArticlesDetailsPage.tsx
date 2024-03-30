import { memo } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { ArticleDetails } from "enitites/Article";
import cls from "./ArticlesDetailsPage.module.scss"
import { useParams } from "react-router-dom";
import React from 'react'
import { CommentList } from "enitites/Comment";
import { Text } from "shared/ui/Text/Text";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsCommentsReducer, getArticleComments } from "../../model/slice/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { 
	getArticleDetailsCommentsIsLoading
} from "../../model/selectors/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading";
import { 
	getArticleDetailsCommentsError
} from "../../model/selectors/getArticleDetailsCommentsError/getArticleDetailsCommentsError";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchArticleCommentsById } from "../../model/services/fetchArticleComments";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ArticlesDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer
}

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	
	const { className } = props
	const { t } = useTranslation("article-details")
	const dispatch = useAppDispatch()
	const { id } = useParams<{ id: string }>()
	const comments = useSelector(getArticleComments.selectAll)
	const commentsError = useSelector(getArticleDetailsCommentsError)
	const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading)

	useInitialEffect(() => {
		dispatch(fetchArticleCommentsById(id))
	}) // вынесли хук с проверкой на storybook

	if (!id) {
		return (
			<div className = {classNames(cls.ArticlesDetailsPage, {}, [className])}>
				{t("Статья не найдена")}
			</div>
		)
	}

	console.log("COMMENTS", comments)

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className = {classNames(cls.ArticlesDetailsPage, {}, [className])}>
				<ArticleDetails
					id = {id}
				/>
				<Text
					title = {t("Комментарии")}
					className = {cls.commentTitle}
				/>
				{/* стейт с комментами храним на уровне страницы */}
				<CommentList
					comments = {comments}
					isLoading = {commentsIsLoading}
				/>
			</div>
		</DynamicModuleLoader>
		
	)
}

export default memo(ArticlesDetailsPage)