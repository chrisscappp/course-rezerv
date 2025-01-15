import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article, ArticleType } from "entities/Article";
import { 
	getArticlesPageLimit, 
	getArticlesPageNum, 
	getArticlesPageOrder, 
	getArticlesPageSearch, 
	getArticlesPageSort,
	getArticlesPageType
} from "../../selectors/articlesPageSelectors";
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams";

interface FetchArticlesListProps {
	replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
	Article[], 
	FetchArticlesListProps, 
	ThunkConfig<string>
>(
  	'articlesPage/fetchArticlesList',
  	async (props, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const limit = getArticlesPageLimit(getState())
		const page = getArticlesPageNum(getState())
		const sort = getArticlesPageSort(getState())
		const order = getArticlesPageOrder(getState())
		const search = getArticlesPageSearch(getState())
		const type = getArticlesPageType(getState())
		const parseType = type === ArticleType.ALL ? undefined : type

		try {
			addQueryParams({
				sort, order, search, type
			})
			// article - родительский ресурс по отношению к комментарию
    		const response = await extra.api.get<Article[]>(`/articles`, {
				params: {
					_expand: "user",
					_limit: limit,
					_page: page,
					_sort: sort,
					_order: order,
					q: search,
					type: parseType
				}
			})
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке списка статей. Попробуйте обновить страницу")
		}	
  	},
)