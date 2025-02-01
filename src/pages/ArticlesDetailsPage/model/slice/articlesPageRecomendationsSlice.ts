import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import { ArticleDetailsRecomendationsSchema } from "../types/articleDetailsRecomendationsSchema";
import { Article } from "@/entities/Article";
import { fetchArticleRecomendations } from "../services/fetchArticleRecomendations/fetchArticleRecomendations";

const recomendationsAdapter = createEntityAdapter<Article>({
	selectId: (comment) => comment.id,
});

export const getArticleRecomendations = recomendationsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsPage?.recomendations || recomendationsAdapter.getInitialState()
);

const recomendationsSlice = createSlice({
	name: "articleDetailsRecomendationsSlice",
	initialState: recomendationsAdapter.getInitialState<ArticleDetailsRecomendationsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticleRecomendations.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleRecomendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
				state.isLoading = false;
				recomendationsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchArticleRecomendations.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articleDetailsRecomendationsReducer } = recomendationsSlice;
