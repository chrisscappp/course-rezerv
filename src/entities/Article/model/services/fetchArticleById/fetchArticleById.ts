import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "../../types/article"

export const fetchArticleById = createAsyncThunk<
	Article, 
	string | undefined, 
	ThunkConfig<string>
>(
  	'articleDetails/fetchArticleById',
  	async (articleId, thunkAPI) => {
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {

			if (!articleId) {
				throw new Error('Статьи с таким идентификатором не найдено')
			}

    		const response = await extra.api.get<Article>(`/articles/${articleId}`, {
				params: {
					_expand: 'user'
				}
			})
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке статьи. Попробуйте обновить страницу")
		}	
  	},
)