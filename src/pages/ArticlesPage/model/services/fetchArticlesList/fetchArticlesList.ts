import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "enitites/Article";

export const fetchArticlesList = createAsyncThunk<
	Article[], 
	void, 
	ThunkConfig<string>
>(
  	'articlesPage/fetchArticlesList',
  	async (_, thunkAPI) => {
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
			// article - родительский ресурс по отношению к комментарию
    		const response = await extra.api.get<Article[]>(`/articles`, {
				params: {
					_expand: "user"
				}
			})
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке списка статей. Попробуйте обновить страницу")
		}	
  	},
)