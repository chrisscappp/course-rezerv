import { CombinedState, ReducersMapObject, configureStore, getDefaultMiddleware, Reducer } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from "../config/types"
import { counterReducer } from "enitites/Counter"
import { userReducer } from "enitites/User"
import { createReducerManager } from "./reducerManager"
import { $api } from "shared/api/api"
import { NavigateOptions } from "react-router-dom"
import { To } from "history"

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>,
	navigate?: (to: To, options?: NavigateOptions) => void,
) {
	
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer
	}

	const reducerManager = createReducerManager(rootReducers)

	const extraArg: ThunkExtraArg = {
		api: $api,
		navigate
	}

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: getDefaultMiddleware => getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg
			} // передали в thunkAPI.extra своё api
		})
	})

	// @ts-ignore
	store.reducerManager = reducerManager

	return store

} // можем переиспользовать store в последствии

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

// основные проблемы связаны с использованием reducerManager, тк
// он использует наши кастомные типы. redux это не воспринимает