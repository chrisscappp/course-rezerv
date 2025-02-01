import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { RouterPath } from "@/shared/config/routeConfig/routeConfig"
import { useSelector } from "react-redux"
import { getCanEditArticle } from "../../model/selectors/article"
import { getArticleDetailsData } from "@/entities/Article"
import { HStack } from "@/shared/ui/Stack"

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
		navigate(RouterPath.articles);
	}, [navigate]);
	
	const onEditArticle = useCallback(() => {
		navigate(`${RouterPath.articles}/${article?.id}/edit`);
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