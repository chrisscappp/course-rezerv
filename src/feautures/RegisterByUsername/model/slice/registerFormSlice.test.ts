import { registerFormActions, registerFormReducer } from "./registerFormSlice";
import { RegisterSchema } from "../types/registerSchema";
import { DeepPartial } from "@reduxjs/toolkit";

describe("test registerFormSlice",() => {
	test("set username", () => {
		const state: DeepPartial<RegisterSchema> = {
			username: "123"
		}

		expect(registerFormReducer(
			state as RegisterSchema,
			registerFormActions.setUsername("123123")
		)).toEqual({ username: "123123" })
	})

	test("set password", () => {
		const state: DeepPartial<RegisterSchema> = {
			password: "123"
		}

		expect(registerFormReducer(
			state as RegisterSchema,
			registerFormActions.setPassword("123123")
		)).toEqual({ password: "123123" })
	})

	test("set repeat password", () => {
		const state: DeepPartial<RegisterSchema> = {
			repeatPassword: "123"
		}

		expect(registerFormReducer(
			state as RegisterSchema,
			registerFormActions.setRepeatPasword("123123")
		)).toEqual({ repeatPassword: "123123" })
	})
})