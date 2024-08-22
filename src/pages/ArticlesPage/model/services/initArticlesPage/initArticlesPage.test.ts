// import { initArticlesPage } from "./initArticlesPage";
// import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

// jest.mock("../fetchArticlesList/fetchArticlesList");

// describe("test initArticlesPage with", () => {
// 	test("test initArticlesPage with inited false", async () => {
// 		const asyncThunk = new TestAsyncThunk(initArticlesPage, {
// 			articlesPage: {
// 				_inited: false,
// 			},
// 		});

// 		await asyncThunk.callThunk({});
// 		expect(asyncThunk.dispatch).toBeCalledTimes(4);
// 	});

// 	test("test initArticlesPage with inited true", async () => {
// 		const asyncThunk = new TestAsyncThunk(initArticlesPage, {
// 			articlesPage: {
// 				_inited: true,
// 			},
// 		});

// 		await asyncThunk.callThunk({});
// 		expect(asyncThunk.dispatch).toBeCalledTimes(2);
// 	});
// });
