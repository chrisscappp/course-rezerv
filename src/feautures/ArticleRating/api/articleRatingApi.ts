import { Rating } from "@/entities/Rating"
import { rtkApi } from "@/shared/api/rtkApi"

interface GetArticleRatingProps {
	userId?: string,
	articleId?: string
}

interface RateArticleProps extends GetArticleRatingProps {
	rate: number,
	feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getArticleRating: build.query<Rating[], GetArticleRatingProps>({
			query: ({ articleId, userId }) => ({
				url: '/article-ratings',
				params: {
					articleId,
					userId
				}
			}),
		}),
		rateArticle: build.mutation<void, RateArticleProps>({
			query: (props) => ({
				url: '/article-ratings',
				method: 'POST',
				body: props
			})
		})
	}),
	overrideExisting: false
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation