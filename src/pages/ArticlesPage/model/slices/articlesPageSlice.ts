import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from "app/providers/StoreProvider"
import { ArticlesPageSchema } from "../types/articlesPageSchema"
import { Article, ArticleType, ArticleView } from "enitites/Article"
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList"
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "shared/consts/localStorage"
import { ArticleSortType } from "enitites/Article"
import { SortOrder } from "shared/types"

const articlesAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id
	// получаем айди
}) // адаптируем (нормализуем данные)

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
	name: "articlesPageSlice",
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
		view: ArticleView.TILE_DETAIL,
		hasMore: true,
		page: 1,
		_inited: false,
		limit: 9,
		order: "asc",
		search: "",
		sort: ArticleSortType.CREATED_AT,
		type: ArticleType.ALL
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.order = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSort: (state, action: PayloadAction<ArticleSortType>) => {
			state.sort = action.payload;
		},
		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload;
		},
		initState: (state) => {
			const view = localStorage.getItem(
				ARTICLES_VIEW_LOCALSTORAGE_KEY
			) as ArticleView;
			state.view = view;
			(state.limit = view === ArticleView.TILE_DETAIL ? 4 : 9),
			(state._inited = true);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticlesList.pending, (state, action) => {
				state.error = undefined;
				state.isLoading = true;

				if (action.meta.arg.replace) {
					articlesAdapter.removeAll(state);
				}
			})
			.addCase(fetchArticlesList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasMore = action.payload.length >= state.limit;

				// этот параметр поступает из переданных пропсов
				if (action.meta.arg.replace) {
					articlesAdapter.setAll(state, action.payload);
				} else {
					articlesAdapter.addMany(state, action.payload);
				}
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articlesPageReducer } = articlesPageSlice
export const { actions: articlesPageActions } = articlesPageSlice