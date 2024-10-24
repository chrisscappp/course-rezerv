import { EntityState } from "@reduxjs/toolkit";
import { Article } from "enitites/Article";

export interface ArticleDetailsRecomendationsSchema extends EntityState<Article> {
  isLoading: boolean;
  error?: string;
}
