import { getRegisterState } from "../getRegisterState/getRegisterState";
import { RegisterSchema } from "../../types/registerSchema";
import { createSelector } from "@reduxjs/toolkit";

export const getRegisterLogin = createSelector(
	getRegisterState,
	(state: RegisterSchema) => state.username
)