import { DeepPartial } from "@reduxjs/toolkit";
import { Decorator, StoryFn } from "@storybook/react"
import { StoreProvider, StateSchema } from "app/providers/StoreProvider";
import React from "react";

export const StoreDecorator = (state: DeepPartial<StateSchema>): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<StoreProvider initialState = {state}>
			<StoryComponent/>
		</StoreProvider>
	)
};

//DeepPartial - определяет конкретные кусочки state, не все поля