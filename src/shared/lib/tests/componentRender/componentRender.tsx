import { ReactNode } from "react";
import { render } from "@testing-library/react"
import { I18nextProvider } from "react-i18next";
import i18nextForTests from "shared/config/i18nConfig/i18nForTests"
import { MemoryRouter } from "react-router-dom"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { DeepPartial } from "@reduxjs/toolkit";

export interface ComponentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<StateSchema>;
}

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
	
	const {
		route = "/",
		initialState,
		asyncReducers
	} = options

	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider asyncReducers={asyncReducers} initialState = {initialState}>
				<I18nextProvider i18n={i18nextForTests}>
        			{ component }
      			</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
	)
}