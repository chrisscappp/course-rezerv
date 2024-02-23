import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from "../config/types"
import { counterReducer } from "enitites/Counter"

export function createReduxStore(initialState?: StateSchema) {
	return configureStore<StateSchema>({
		reducer: {
			counter: counterReducer
		},
		devTools: __IS_DEV__,
		preloadedState: initialState
	})
} // можем переиспользовать store в последствии
