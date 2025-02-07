// eslint-disable-next-line alexandroo4-plugin/fsd-public-api-imports-beer-insomnia
import { ThemeProvider } from "@/app/providers/ThemeProvider"
import { Themes } from "@/shared/consts/theme"
import { Decorator, StoryFn } from "@storybook/react"
import React from "react";

export const ThemeDecorator = (theme: Themes): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<ThemeProvider
			initialTheme = {theme}
		>
			<div className = {`app ${theme}`}>
				<StoryComponent/>
			</div>
		</ThemeProvider>
	)
};