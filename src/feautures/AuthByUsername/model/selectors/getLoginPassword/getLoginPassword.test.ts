import { getLoginPassword } from "./getLoginPassword";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

describe('getLoginPassword test', () => {
	test('get password', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: { password: "12345" }
		}
		expect(getLoginPassword(state as StateSchema)).toEqual("12345")
	})

	test('get empty password', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginPassword(state as StateSchema)).toEqual("")
	})
}) 