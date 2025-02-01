import { Profile } from "@/entities/Profile";
import { ValidateProfileError } from "../consts/validateProfileError";

export interface EditableProfileSchema {
	data?: Profile,
    form?: Profile,
	isLoading?: boolean,
	error?: string,
	readonly?: boolean,
	validateErrors?: ValidateProfileError[]
}