import { getRegisterPassword } from "./getRegisterPassword";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

describe('getRegisterPassword', () => {
	test('get register state password', () => {
		const state: DeepPartial<StateSchema> = {
			registerForm: { password: "password" }
		} // deppPartial - игнор всех полей и типизация тех, которые необходимы
		expect(getRegisterPassword(state as StateSchema)).toEqual("password")
	})
}) 