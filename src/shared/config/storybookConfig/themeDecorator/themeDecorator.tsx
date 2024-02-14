import { Decorator, StoryFn } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider";
import React from "react";

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Themes): Decorator => (StoryComponent: StoryFn)  => {
	return (
		<div className = {`app ${theme}`}>
			<StoryComponent/>
		</div>
	)
};