import { Decorator, StoryFn } from "@storybook/react"
import React from "react"
import "../../../../app/styles/index.scss"

export const StyleDecorator: Decorator = Story => Story();
// FIX STYLES
/*export const StyleDecorator = (StoryComponent: StoryFn) => {
	return (
		<div>
			<StoryComponent/>
		</div>
	)
}*/