import { Reducer } from "@reduxjs/toolkit";
import { StateSchema, StateSchemaKey } from "@/app/providers/StoreProvider";
import React, { useEffect } from "react";
import { useStore, useDispatch } from "react-redux";

export type ReducersList = {
	[reducerKey in StateSchemaKey]?: Reducer<NonNullable<StateSchema[reducerKey]>>;
}

type ReducersListEntry = [StateSchemaKey, Reducer]
// тип для кортежа

export interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
	children: any
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {

	const {
		children,
		reducers,
		removeAfterUnmount
	} = props

	//@ts-ignore
	const store = useStore() as ReduxStoreWithManager
	const dispatch = useDispatch()

	useEffect(() => {
		const mountedReducers = store.reducerManager.getMountedReducers()
		Object.entries(reducers).forEach(([key, reducer]) => {
			const mounted = mountedReducers[key as StateSchemaKey]
			if (!mounted) {
				store.reducerManager.add(key as StateSchemaKey, reducer);
				dispatch({ type: `@INIT ${key} Reducer` });
			} // добавляем новый редюсер только если его нет
		})
		
		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([key, _]) => {
					store.reducerManager.remove(key as StateSchemaKey)
					dispatch({type: `@REMOVE ${key} Reducer`})
				})	
			}
		}
		//eslint-disable-next-line
	}, [])

	return (
		<>
			{children}
		</>
	)
}