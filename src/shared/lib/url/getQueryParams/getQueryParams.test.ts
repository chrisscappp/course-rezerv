import { getQueryParams } from "./getQueryParams"

describe("shared/url/getQueryParams", () => {
	test("test with one param", () => {
		const params = getQueryParams({
			test: "aboba"
		})
		expect(params).toBe("?test=aboba")
	})
	test("test with two param", () => {
		const params = getQueryParams({
			test: "aboba",
			bobro: "adidas"
		})
		expect(params).toBe("?test=aboba&bobro=adidas")
	})
	test("test with one param is undefined", () => {
		const params = getQueryParams({ 
			test: "aboba",
			bobro: undefined
		});
		expect(params).toBe("?test=aboba");
	})
	test("test without params", () => {
		const params = getQueryParams({})
		expect(params).toBe("?")
	})
})