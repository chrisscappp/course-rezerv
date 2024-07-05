export {
	ArticleDetails
} from "./ui/ArticleDetails/ArticleDetails"

export {
	Article
} from "./model/types/article"

export { ArticleDetailsSchema } from "./model/types/articleDetailsSchema"
export { articleDetailsActions, articleDetailsReducer } from "./model/slice/articleSlice"
export { getArticleDetailsData } from "./model/selectors/articleDetailsSelector"