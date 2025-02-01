import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";

export const getScrollRestoringScroll = (state: StateSchema) => state.scroll.scroll
export const getScrollRestoringScrollByPath = createSelector(
	getScrollRestoringScroll,
	(state: StateSchema, path: string) => path,
	(scroll, path) => scroll[path] || 0
)