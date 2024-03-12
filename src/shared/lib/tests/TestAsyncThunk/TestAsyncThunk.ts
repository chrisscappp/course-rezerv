import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import axios, { AxiosStatic } from "axios";

type ActionCreatorType<Return, Arg, Rejected> = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: Rejected }>

jest.mock("axios")
const mockedAxios = jest.mocked(axios, true)
// замокали axios, с глубоким моком. теперь замоканный axios будет поддерживать
// типы jest. мокаем также внутренние поля (поле пост например). глубокий мок

export class TestAsyncThunk<Return, Arg, Rejected> {
	dispatch: jest.MockedFn<any>
	getState: () => StateSchema
	actionCreator: ActionCreatorType<Return, Arg, Rejected>
	api: jest.MockedFunctionDeep<AxiosStatic>
	navigate: jest.MockedFn<any>

	constructor(actionCreator: ActionCreatorType<Return, Arg, Rejected>) {
		this.actionCreator = actionCreator
		this.dispatch = jest.fn()
		this.getState = jest.fn()
		this.api = mockedAxios
		this.navigate = jest.fn()
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg)
		const res = await action(this.dispatch, this.getState, { 
			api: this.api,
			navigate: this.navigate
		})

		return res
	}
}