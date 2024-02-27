import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from "../config/types"
import { counterReducer } from "enitites/Counter"
import { inputReducer } from "enitites/Input/index"

export function createReduxStore(initialState?: StateSchema) {
	return configureStore<StateSchema>({
		reducer: {
			counter: counterReducer,
			input: inputReducer
		},
		devTools: __IS_DEV__,
		preloadedState: initialState
	})
} // можем переиспользовать store в последствии
