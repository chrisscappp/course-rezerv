import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserAuthData } from "@/entities/User";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getArticleDetailsData } from "@/entities/Article";
import { Comment } from "@/entities/Comment";
import { fetchArticleCommentsById } from "./fetchArticleComments";

// обеспечили независимость от сущностей
export const sendCommentForArticle = createAsyncThunk<
	Comment, 
	// возвращамемый тип
	string, 
	// тип аргументов action
	ThunkConfig<string>
	// типизировали thunkAPI
>(
  	'articleDetails/sendCommentForArticle',
  	async (text, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const authData = getUserAuthData(getState())
		const article = getArticleDetailsData(getState())

		if (!authData || !text || !article) {
			return rejectWithValue("no data")
		}

		try {
    		const response = await extra.api.post<Comment>("/comments", {
				articleId: article.id,
				userId: authData.id,
				text
			})
			if (!response.data) {
				throw new Error()
			}

			dispatch(fetchArticleCommentsById(article.id))

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Неверный логин или пароль")
		}	
  	},
)
// идея в том, чтобы отвязывать универсальные функции от сущностей, фичей...
// и передавать нужные значения аргументами