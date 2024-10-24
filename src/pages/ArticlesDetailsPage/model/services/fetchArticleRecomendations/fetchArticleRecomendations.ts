import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "enitites/Article";

export const fetchArticleRecomendations = createAsyncThunk<
	Article[], 
	void, 
	ThunkConfig<string>
>(
  	'articlesPage/fetchArticleRecomendations',
  	async (_, thunkAPI) => {
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.get<Article[]>(`/articles`, {
				params: {
					_limit: 4,
				}
			})
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке списка статей. Попробуйте обновить страницу")
		}	
  	},
)