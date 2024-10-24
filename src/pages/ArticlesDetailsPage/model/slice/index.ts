import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";
import { articleDetailsRecomendationsReducer } from "./articlesPageRecomendationsSlice";

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
	comments: articleDetailsCommentsReducer,
	recomendations: articleDetailsRecomendationsReducer
}) // сгруппированный редюсер