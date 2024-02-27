import { createSelector } from "@reduxjs/toolkit";
import { getInput } from "../getInput/getInput";
import { InputSchema } from "../../types/inputSchema";

export const getInputValue = createSelector(
	getInput,
	(input: InputSchema) => input.value
)