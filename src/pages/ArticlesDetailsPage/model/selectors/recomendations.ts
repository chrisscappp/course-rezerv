import { StateSchema } from "app/providers/StoreProvider";

export const getArticleDetailsRecomendationsIsLoading = (state: StateSchema) => state.articleDetailsPage?.recomendations?.isLoading 
export const getArticleDetailsRecomendationsError = (state: StateSchema) => state.articleDetailsPage?.recomendations?.error 