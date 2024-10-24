import { getUserAuthData } from "enitites/User";
import { getArticleDetailsData } from "enitites/Article";
import { createSelector } from "@reduxjs/toolkit";

export const getCanEditArticle = createSelector(
	getArticleDetailsData,
	getUserAuthData,
	(article, user) => {
		if (!article || !user) {
			return false
		}
		return article.user.id === user.id
	}
)