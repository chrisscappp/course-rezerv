import { createSelector } from "@reduxjs/toolkit";
import { UserSchema } from "../../types/user";
import { getUserState } from "../getUserState/getUserState";

export const getUserAuthData = createSelector(
	getUserState,
	(state: UserSchema) => state.authData
)