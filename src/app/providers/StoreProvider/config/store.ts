import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from "../config/types"
import { counterReducer } from "enitites/Counter"
import { userReducer } from "enitites/User"
import { loginFormReducer } from "feautures/AuthByUsername"
import { registerFormReducer } from "feautures/RegisterByUsername"

export function createReduxStore(initialState?: StateSchema) {
	
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer,
		loginForm: loginFormReducer,
		registerForm: registerFormReducer
	}

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState
	})
} // можем переиспользовать store в последствии
