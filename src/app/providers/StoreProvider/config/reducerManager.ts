import { AnyAction, Reducer, ReducersMapObject, combineReducers } from "@reduxjs/toolkit"
import { StateSchema, StateSchemaKey, ReducerManagerType, MountedReducers } from "./types"

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManagerType {
	const reducers = { ...initialReducers }
	let combinedReducer = combineReducers(reducers)
	let keysToRemove: Array<StateSchemaKey> = []
	const mountedReducers: MountedReducers = {}

	return {
		getReducerMap: () => reducers,
		getMountedReducers: () => mountedReducers,
		reduce: (state: StateSchema, action: AnyAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state }
				for (let key of keysToRemove) {
					delete state[key]
				}
				keysToRemove = []
			}
			return combinedReducer(state, action) // возвращает state!!!
			// обновили store, удалив все ненужные reducer-ы
		},
		add: (key: StateSchemaKey, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return
			}
			reducers[key] = reducer
			mountedReducers[key] = true;
			combinedReducer = combineReducers(reducers)
			// добавили новый reducer в store
		},
		remove: (key: StateSchemaKey) => {
			if (!key || !reducers[key]) {
				return
			}
			delete reducers[key]
			keysToRemove.push(key)
			mountedReducers[key] = false;
			combinedReducer = combineReducers(reducers)
			// удалили reducer по ключу, удалили его из store
		}
	}
}