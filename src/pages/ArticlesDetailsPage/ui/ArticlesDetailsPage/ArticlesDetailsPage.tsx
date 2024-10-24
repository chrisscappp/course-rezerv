import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { ArticleDetails, ArticleList, ArticleView } from "enitites/Article";
import cls from "./ArticlesDetailsPage.module.scss"
import { useParams } from "react-router-dom";
import React from 'react'
import { CommentList } from "enitites/Comment";
import { Text, TextSize } from "shared/ui/Text/Text";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getArticleComments } from "../../model/slice/articleDetailsCommentsSlice";
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
import { Page } from "widgets/Page/Page";
import { getArticleRecomendations } from "../../model/slice/articlesPageRecomendationsSlice";
import { 
	getArticleDetailsRecomendationsError, 
	getArticleDetailsRecomendationsIsLoading
} from "../../model/selectors/recomendations";
import { 
	fetchArticleRecomendations
} from "../../model/services/fetchArticleRecomendations/fetchArticleRecomendations";
import { articleDetailsPageReducer } from "../../model/slice";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";

interface ArticlesDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer
} // передали главный редюсер (группу)

// страница - это перечисление фичей
const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	
	const { className } = props
	const { t } = useTranslation("article-details")
	const dispatch = useAppDispatch()
	const { id } = useParams<{ id: string }>()
	const comments = useSelector(getArticleComments.selectAll)
	const commentsError = useSelector(getArticleDetailsCommentsError)
	const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
	const recomendations = useSelector(getArticleRecomendations.selectAll);
	const recomendationsError = useSelector(getArticleDetailsRecomendationsError);
	const recomendationsIsLoading = useSelector(getArticleDetailsRecomendationsIsLoading);

	const onSendComment = useCallback((text: string) => {
		dispatch(sendCommentForArticle(text))
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(fetchArticleCommentsById(id ? id : ""))
		dispatch(fetchArticleRecomendations())
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
			<Page className = {classNames(cls.ArticlesDetailsPage, {}, [className])} saveScroll>
				<ArticlesDetailsPageHeader/>
				<ArticleDetails id = {id}/>
				<Text
					size = {TextSize.L}
					title = {t("Рекомендуем")}
					className = {cls.commentTitle}
				/>
				<ArticleList
					articles = {recomendations}
					view = {ArticleView.TILE}
					isLoading = {recomendationsIsLoading}
					className = {cls.recomendations}
					target = "_blank"
				/>
				<Text
					size = {TextSize.L}
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