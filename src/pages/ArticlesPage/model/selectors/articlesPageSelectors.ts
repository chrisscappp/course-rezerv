import { StateSchema } from "app/providers/StoreProvider"
import { ArticleSortType, ArticleType } from "enitites/Article"

export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited
export const getArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortType.CREATED_AT
export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? "asc"
export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? ""
export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL