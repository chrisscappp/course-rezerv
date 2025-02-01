import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getArticlesPageHasMore, getArticlesPageNum } from "../../selectors/articlesPageSelectors";
import { getArticlesPageIsLoading } from "../../selectors/getArticlesPageIsLoading/getArticlesPageIsLoading";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlesPart = createAsyncThunk<
	void, 
	void, 
	ThunkConfig<string>
>(
  	'articlesPage/fetchNextArticlesPart',
  	async (_, thunkAPI) => {
		const {
			getState,
			dispatch
		} = thunkAPI

		const hasMore = getArticlesPageHasMore(getState())
		const page = getArticlesPageNum(getState())
		const isLoading = getArticlesPageIsLoading(getState())

		if (hasMore && !isLoading) {
			dispatch(articlesPageActions.setPage(page + 1))
			dispatch(fetchArticlesList({}))	
		}
  	},
)