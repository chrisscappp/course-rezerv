import { getLoginUsername } from "./getLoginUsername";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

describe('getLoginUsername test', () => {
	test('get loginUsername', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: { username: "aboa" }
		}
		expect(getLoginUsername(state as StateSchema)).toEqual("aboa")
	})

	test('get empty loginUsername', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginUsername(state as StateSchema)).toEqual("")
	})
}) 