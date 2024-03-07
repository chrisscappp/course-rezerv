import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from "../config/types"
import { counterReducer } from "enitites/Counter"
import { userReducer } from "enitites/User"
import { createReducerManager } from "./reducerManager"

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer
	}

	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		devTools: __IS_DEV__,
		preloadedState: initialState
	})

	// @ts-ignore
	store.reducerManager = reducerManager

	return store

} // можем переиспользовать store в последствии

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']