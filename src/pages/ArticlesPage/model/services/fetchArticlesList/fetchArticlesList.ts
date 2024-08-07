import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "enitites/Article";
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
	page?: number
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

		const { page = 1 } = props
		const limit = getArticlesPageLimit(getState())

		try {
			// article - родительский ресурс по отношению к комментарию
    		const response = await extra.api.get<Article[]>(`/articles`, {
				params: {
					_expand: "user",
					_limit: limit,
					_page: page
				}
			})
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке списка статей. Попробуйте обновить страницу")
		}	
  	},
)