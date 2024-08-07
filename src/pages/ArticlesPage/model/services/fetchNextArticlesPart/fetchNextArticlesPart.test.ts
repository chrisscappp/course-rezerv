import { fetchNextArticlesPart } from "./fetchNextArticlesPart"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"

jest.mock("../fetchArticlesList/fetchArticlesList")

describe("test fetchNextArticlesPart", () => {

	test("success", async () => {

		const asyncThunk = new TestAsyncThunk(fetchNextArticlesPart, {
			articlesPage: {
				hasMore: true,
				limit: 5,
				entities: {},
				ids: [],
				isLoading: false,
				page: 2
			}
		})

		await asyncThunk.callThunk()
		
		expect(asyncThunk.dispatch).toBeCalledTimes(4)
		// pending, fullfiled, и 2 штуки внутри action
		expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 })
	})

	test("fetchArticlesList not called cause hasMore is false", async () => {

		const asyncThunk = new TestAsyncThunk(fetchNextArticlesPart, {
			articlesPage: {
				hasMore: false,
				limit: 5,
				entities: {},
				ids: [],
				isLoading: false,
				page: 2
			}
		})

		await asyncThunk.callThunk()
		
		expect(asyncThunk.dispatch).toBeCalledTimes(2)
		// pending, fullfiled, и 2 штуки внутри action
		expect(fetchArticlesList).not.toHaveBeenCalled()
	})

	test("fetchArticlesList not called cause isLoading is true", async () => {

		const asyncThunk = new TestAsyncThunk(fetchNextArticlesPart, {
			articlesPage: {
				hasMore: true,
				limit: 5,
				entities: {},
				ids: [],
				isLoading: true,
				page: 2
			}
		})

		await asyncThunk.callThunk()
		
		expect(asyncThunk.dispatch).toBeCalledTimes(2)
		// pending, fullfiled, и 2 штуки внутри action
		expect(fetchArticlesList).not.toHaveBeenCalled()
	})
})