import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from "../config/types"
import { counterReducer } from "enitites/Counter"
import { userReducer } from "enitites/User"

export function createReduxStore(initialState?: StateSchema) {
	
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer
	}

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState
	})
} // можем переиспользовать store в последствии
