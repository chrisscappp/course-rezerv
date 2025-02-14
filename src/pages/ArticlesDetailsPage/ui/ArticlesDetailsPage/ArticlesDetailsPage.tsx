import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames"
import { ArticleDetails } from "@/entities/Article";
import cls from "./ArticlesDetailsPage.module.scss"
import { useParams } from "react-router-dom";
import React from 'react'
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "@/widgets/Page/ui/Page";
import { articleDetailsPageReducer } from "../../model/slice";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";
import { VStack } from "@/shared/ui/Stack";
import { ArticleRecomendationsList } from "@/feautures/ArticleRecomendationsList";
import { ArticlesDetailsComments } from "../ArticlesDetailsComments/ArticlesDetailsComments";
import { ArticleRating } from "@/feautures/ArticleRating";

interface ArticlesDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer
} // передали главный редюсер (группу)

// страница - это перечисление фичей
const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	
	const { className } = props
	const { id } = useParams<{ id: string }>()

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className = {classNames(cls.ArticlesDetailsPage, {}, [className])} saveScroll>
				<VStack gap="32" max>
					<ArticlesDetailsPageHeader/>
					<ArticleDetails id={id}/>
					<ArticleRating articleId={id}/>
					<ArticleRecomendationsList/> 
					<ArticlesDetailsComments articleId={id}/>
				</VStack>
			</Page>
		</DynamicModuleLoader>
		
	)
}

export default memo(ArticlesDetailsPage)