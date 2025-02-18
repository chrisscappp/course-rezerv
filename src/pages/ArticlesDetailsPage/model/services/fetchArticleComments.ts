import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Comment } from "@/entities/Comment";

export const fetchArticleCommentsById = createAsyncThunk<
	Comment[], 
	string | undefined, 
	ThunkConfig<string>
>(
  	'articleDetails/fetchArticleComments',
  	async (articleId, thunkAPI) => {
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		if (!articleId) {
			rejectWithValue("error")
		}

		try {

			if (!articleId) {
				throw new Error('Не удалось получить список комментариев для статьи')
			}

			// article - родительский ресурс по отношению к комментарию
    		const response = await extra.api.get<Comment[]>(`/comments`, {
				params: {
					articleId,
					_expand: "user" // в дальнейшем по id пользователя получим о нём полную инфу
					// об авторе коммента
					// это делается через expand
				}
			})
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке статьи. Попробуйте обновить страницу")
		}	
  	},
)