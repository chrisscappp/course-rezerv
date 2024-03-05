import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { Decorator, StoryFn } from "@storybook/react"
import { StoreProvider, StateSchema } from "app/providers/StoreProvider";
import { loginFormReducer } from "feautures/AuthByUsername/model/slice/loginFormSlice";
import React from "react";

const initialAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	loginForm: loginFormReducer
}

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<StoreProvider initialState = {state} asyncReducers={{...initialAsyncReducers, ...asyncReducers}}>
			<StoryComponent/>
		</StoreProvider>
	)
};

//DeepPartial - определяет конкретные кусочки state, не все поля