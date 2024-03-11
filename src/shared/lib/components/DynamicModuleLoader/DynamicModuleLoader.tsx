import { Reducer } from "@reduxjs/toolkit";
import { StateSchemaKey } from "app/providers/StoreProvider";
import React, { FC, useEffect } from "react";
import { useStore, useDispatch } from "react-redux";

export type ReducersList = {
	[reducerKey in StateSchemaKey]?: Reducer;
}

type ReducersListEntry = [StateSchemaKey, Reducer]
// тип для кортежа

export interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {

	const {
		children,
		reducers,
		removeAfterUnmount
	} = props

	//@ts-ignore
	const store = useStore() as ReduxStoreWithManager
	const dispatch = useDispatch()

	useEffect(() => {
		Object.entries(reducers).forEach(([key, reducer]: ReducersListEntry) => {
			store.reducerManager.add(key, reducer)
			dispatch({type: `@INIT ${key} Reducer`})
		})
		
		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([key, _]: ReducersListEntry) => {
					store.reducerManager.remove(key)
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