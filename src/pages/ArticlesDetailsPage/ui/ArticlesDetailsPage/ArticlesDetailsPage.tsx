import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { ArticleDetails } from "enitites/Article";
import cls from "./ArticlesDetailsPage.module.scss"
import { useNavigate, useParams } from "react-router-dom";
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
import { AddCommentForm } from "feautures/AddCommentForm";
import { sendCommentForArticle } from "../../model/services/addCommentForArticle";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { Page } from "shared/ui/Page/Page";

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
	const navigate = useNavigate()

	const onOpenArticleList = useCallback(() => {
		navigate(RouterPath.articles)
	}, [navigate])

	const onSendComment = useCallback((text: string) => {
		dispatch(sendCommentForArticle(text))
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(fetchArticleCommentsById(id ? id : ""))
	}, []) // вынесли хук с проверкой на storybook

	if (!id) {
		return (
			<Page className = {classNames(cls.ArticlesDetailsPage, {}, [className])}>
				{t("Статья не найдена")}
			</Page>
		)
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className = {classNames(cls.ArticlesDetailsPage, {}, [className])}>
				<Button 
					theme = {ButtonTheme.OUTLINE_INVERTED}
					onClick = {onOpenArticleList}
				>
					{t("Назад к списку")}
				</Button>
				<ArticleDetails
					id = {id}
				/>
				<Text
					title = {t("Комментарии")}
					className = {cls.commentTitle}
				/>
				<AddCommentForm
					className = {cls.addComment}
					onSend = {onSendComment}
				/>
				{/* стейт с комментами храним на уровне страницы */}
				<CommentList
					comments = {comments}
					isLoading = {commentsIsLoading}
				/>
			</Page>
		</DynamicModuleLoader>
		
	)
}

export default memo(ArticlesDetailsPage)