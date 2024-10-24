import { StateSchema } from "app/providers/StoreProvider"
import { ArticleView } from "enitites/Article"

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view ?? ArticleView.TILE_DETAIL