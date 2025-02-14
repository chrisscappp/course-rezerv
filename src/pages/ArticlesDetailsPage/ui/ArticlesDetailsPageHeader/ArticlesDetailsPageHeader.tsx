import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { getCanEditArticle } from "../../model/selectors/article"
import { getArticleDetailsData } from "@/entities/Article"
import { HStack } from "@/shared/ui/Stack"
import { getRouteArticleEdit, getRouteArticles } from "@/shared/consts/router"

interface ArticlesDetailsPageHeaderProps {
	className?: string
}

export const ArticlesDetailsPageHeader = (props: ArticlesDetailsPageHeaderProps) => {
	
	const {
		className
	} = props

	const { t } = useTranslation()
	const navigate = useNavigate()
	const isCanEdit = useSelector(getCanEditArticle)
	const article = useSelector(getArticleDetailsData)

	const onOpenArticleList = useCallback(() => {
		navigate(getRouteArticles());
	}, [navigate]);
	
	const onEditArticle = useCallback(() => {
		navigate(getRouteArticleEdit(article?.id ?? ''));
	}, [article?.id, navigate]);

	return (
		<HStack max justify="between" className={className}>
			<Button theme={ButtonTheme.OUTLINE_INVERTED} onClick={onOpenArticleList}>
				{t("Назад к списку")}
			</Button>
			{isCanEdit && 
			<Button
				theme={ButtonTheme.OUTLINE_INVERTED} 
				onClick={onEditArticle}
			>
				{t("Редактировать")}
			</Button>
			}
		</HStack>
	);
}