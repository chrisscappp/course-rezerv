import { Decorator, StoryFn } from "@storybook/react"
import { StoreProvider, StateSchema } from "app/providers/StoreProvider";
import { editableProfileReducer } from "feautures/EditableProfileCard";
import { loginFormReducer } from "feautures/AuthByUsername/model/slice/loginFormSlice";
import React from "react";
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "entities/Article";

const initialAsyncReducers: ReducersList = {
	loginForm: loginFormReducer,
	editableProfile: editableProfileReducer,
	articleDetails: articleDetailsReducer
}

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: ReducersList
): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<StoreProvider initialState = {state} asyncReducers={{...initialAsyncReducers, ...asyncReducers}}>
			<StoryComponent/>
		</StoreProvider>
	)
};

//DeepPartial - определяет конкретные кусочки state, не все поля