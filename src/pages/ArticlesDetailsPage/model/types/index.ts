import { ArticleDetailsCommentsSchema } from "./articleDetailsCommentsSchema";
import { ArticleDetailsRecomendationsSchema } from "./articleDetailsRecomendationsSchema";

export interface ArticleDetailsPageSchema {
	comments: ArticleDetailsCommentsSchema,
	recomendations: ArticleDetailsRecomendationsSchema
}

// учебный пример. в дальнейшем это всё вынесется в отдельные фичи