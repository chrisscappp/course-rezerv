import { Decorator, StoryFn } from "@storybook/react"
// eslint-disable-next-line alexandroo4-plugin/fsd-public-api-imports-beer-insomnia
import { StoreProvider, StateSchema } from "@/app/providers/StoreProvider";
import { editableProfileReducer } from "@/feautures/EditableProfileCard/testing";
import { loginFormReducer } from "@/feautures/AuthByUsername/testing";
import React from "react";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "@/entities/Article/testing";
import { addCommentFormReducer } from "@/feautures/AddCommentForm/testing";

// eslint плагин, который тестовые данные только для тестовых файлов!!!
// итого получается, что тестовые данные, импортированные из testing public api, могут
// быть использованы только в файлах для тестовы (опциями передали, micromatch проверили)

const initialAsyncReducers: ReducersList = {
	loginForm: loginFormReducer,
	editableProfile: editableProfileReducer,
	articleDetails: articleDetailsReducer,
	addCommentForm: addCommentFormReducer
} // проверка по ключу в виде названия редюсера. вытаскиваем из stateSchema конкретный тип
// для этого редюсера. если совпадение есть - значит всё ок

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: ReducersList
): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<StoreProvider initialState={state} asyncReducers={{...initialAsyncReducers, ...asyncReducers}}>
			<StoryComponent/>
		</StoreProvider>
	)
};

//DeepPartial - определяет конкретные кусочки state, не все поля