import { Decorator, StoryFn } from "@storybook/react"
import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18nForTests from "shared/config/i18nConfig/i18nForTests"

export const TranslationDecorator = (): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<I18nextProvider i18n = {i18nForTests}>
			<Suspense fallback = "">
				<StoryComponent/>
			</Suspense>
		</I18nextProvider>
	)
};