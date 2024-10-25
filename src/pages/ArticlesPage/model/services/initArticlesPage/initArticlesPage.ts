import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { SortOrder } from "shared/types";
import { ArticleSortType, ArticleType } from "entities/Article";

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	"articlesPage/initArticlesPage",
	async (searchParams, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;

		const inited = getArticlesPageInited(getState());

		if (!inited) {
			const orderFormUrl = searchParams.get("order")
			const sortFormUrl = searchParams.get("sort");
			const searchFormUrl = searchParams.get("search");
			const typeFormUrl = searchParams.get("type");

			if (orderFormUrl) dispatch(articlesPageActions.setOrder(orderFormUrl as SortOrder))
			if (sortFormUrl) dispatch(articlesPageActions.setSort(sortFormUrl as ArticleSortType))
			if (searchFormUrl) dispatch(articlesPageActions.setSearch(searchFormUrl))
			if (typeFormUrl) dispatch(articlesPageActions.setType(typeFormUrl as ArticleType));
			
			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({}));
		}
	}
);
