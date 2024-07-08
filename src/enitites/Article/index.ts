export { ArticleDetails } from "./ui/ArticleDetails/ArticleDetails"
export { ArticleList } from "./ui/ArticleList/ArticleList"
export { ArticleViewSelector } from "./ui/ArticleViewSelector/ArticleViewSelector"

export {
	Article,
	ArticleView
} from "./model/types/article"

export { ArticleDetailsSchema } from "./model/types/articleDetailsSchema"
export { articleDetailsActions, articleDetailsReducer } from "./model/slice/articleSlice"
export { getArticleDetailsData } from "./model/selectors/articleDetailsSelector"