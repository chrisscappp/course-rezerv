import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScrollRestoringSchema } from "../types/scrollRestoring";

const initialState: ScrollRestoringSchema = {
	scroll: {}
};

export const scrollRestoringSlice = createSlice({
	name: "scroll",
	initialState,
	reducers: {
		setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
			state.scroll[payload.path] = payload.position;
		}
	},
});

export const { actions: scrollRestoringActions } = scrollRestoringSlice;
export const { reducer: scrollRestoringReducer } = scrollRestoringSlice;
