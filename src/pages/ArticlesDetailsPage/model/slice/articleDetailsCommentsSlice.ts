import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from "app/providers/StoreProvider"
import { Comment } from "enitites/Comment"
import { ArticleDetailsCommentsSchema } from "../types/articleDetailsCommentsSchema"
import { fetchArticleCommentsById } from "../services/fetchArticleComments"

const commentsAdapter = createEntityAdapter<Comment>({
	selectId: (comment) => comment.id
	// получаем айди
}) // адаптируем (нормализуем данные)

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsComments || commentsAdapter.getInitialState()
)

const commentsSlice = createSlice({
	name: 'articleDetailsCommentsSlice',
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}), // инициализация initialState 
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticleCommentsById.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleCommentsById.fulfilled, (
				state,
				action: PayloadAction<Comment[]>,
			) => {
				state.isLoading = false;
				commentsAdapter.setAll(state, action.payload)
				// ф-ия нормализации данных
				// под капотом всё сделает сам
			})
			.addCase(fetchArticleCommentsById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
	},
})

export const { reducer: articleDetailsCommentsReducer } = commentsSlice
export const { actions: articleDetailsCommentsActions } = commentsSlice