import { Article } from "@/entities/Article"
import { rtkApi } from "@/shared/api/rtkApi"

const recomendationsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getArticleRecomendations: build.query<Article[], number>({
			query: (limit) => ({
				url: '/articles',
				params: {
					_limit: limit
				}
			}), // настройка http запроса
		}),
	}),
	overrideExisting: false
})

export const useArticleRecomendationsList = recomendationsApi.useGetArticleRecomendationsQuery