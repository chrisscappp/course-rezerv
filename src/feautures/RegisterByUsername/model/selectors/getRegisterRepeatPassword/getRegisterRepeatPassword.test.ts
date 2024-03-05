import { getRegisterRepeatPassword } from "./getRegisterRepeatPassword";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

describe('getRegisterRepeatPassword', () => {
	test('get register state repeat password', () => {
		const state: DeepPartial<StateSchema> = {
			registerForm: { repeatPassword: "repeat" }
		}
		expect(getRegisterRepeatPassword(state as StateSchema)).toEqual("repeat")
	})
}) 