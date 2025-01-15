import { memo } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { ArticleDetails } from "entities/Article";
import cls from "./ArticlesDetailsPage.module.scss"
import { useParams } from "react-router-dom";
import React from 'react'
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "widgets/Page/Page";
import { articleDetailsPageReducer } from "../../model/slice";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";
import { VStack } from "shared/ui/Stack";
import { ArticleRecomendationsList } from "feautures/ArticleRecomendationsList";
import { ArticlesDetailsComments } from "../ArticlesDetailsComments/ArticlesDetailsComments";

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
	const { id } = useParams<{ id: string }>()

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
				<VStack gap="32" max>
					<ArticlesDetailsPageHeader/>
					<ArticleDetails id = {id}/>
					<ArticleRecomendationsList/> 
					<ArticlesDetailsComments articleId={id}/>
				</VStack>
			</Page>
		</DynamicModuleLoader>
		
	)
}

export default memo(ArticlesDetailsPage)