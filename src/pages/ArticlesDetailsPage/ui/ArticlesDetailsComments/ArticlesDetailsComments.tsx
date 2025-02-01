import { CommentList } from "@/entities/Comment"
import { AddCommentForm } from "@/feautures/AddCommentForm"
import { getArticleDetailsCommentsError } from "../../model/selectors/getArticleDetailsCommentsError/getArticleDetailsCommentsError"
import { getArticleDetailsCommentsIsLoading } from "../../model/selectors/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading"
import { sendCommentForArticle } from "../../model/services/addCommentForArticle"
import { getArticleComments } from "../../model/slice/articleDetailsCommentsSlice"
import { memo, Suspense, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { classNames } from "@/shared/lib/classNames/classNames"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { VStack } from "@/shared/ui/Stack"
import { Text, TextSize } from "@/shared/ui/Text/Text"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { fetchArticleCommentsById } from "../../model/services/fetchArticleComments"
import { Spinner } from "@/shared/ui/Spinner/Spinner"

interface ArticlesDetailsCommentsProps {
	className?: string,
	articleId?: string
}

export const ArticlesDetailsComments = memo((props: ArticlesDetailsCommentsProps) => {
	
	const { className, articleId } = props

	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const comments = useSelector(getArticleComments.selectAll)
	const error = useSelector(getArticleDetailsCommentsError)
	const isLoading = useSelector(getArticleDetailsCommentsIsLoading)

	useInitialEffect(() => {
		dispatch(fetchArticleCommentsById(articleId))
	}, []) // вынесли хук с проверкой на storybook
	
	const onSendComment = useCallback((text: string) => {
		dispatch(sendCommentForArticle(text))
	}, [dispatch])
	
	return (
		<VStack max gap="16" className={classNames('', {}, [className])}>
			<Text
				size={TextSize.L}
				title={t("Комментарии")}
			/>
			<Suspense fallback={<Spinner/>}>
				<AddCommentForm
					onSend={onSendComment}
				/>
			</Suspense>
			{/* стейт с комментами храним на уровне страницы */}
			<CommentList
				comments={comments}
				isLoading={isLoading}
				error={error}
			/>
		</VStack>
	)
})