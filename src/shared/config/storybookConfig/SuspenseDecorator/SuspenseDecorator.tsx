import { Decorator } from "@storybook/react"
import React, { Suspense } from "react"

export const SuspenseDecorator: Decorator = (Story) => {
	return (
		<Suspense fallback={null}>
			{Story()}
		</Suspense>
	)
};