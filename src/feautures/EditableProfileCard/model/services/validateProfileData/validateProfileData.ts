import { Profile } from "@/entities/Profile";
import { ValidateProfileError } from "../../consts/validateProfileError";

export const validateProfileData = (profile?: Profile) => {
	
	if (!profile) {
		return [ValidateProfileError.NO_DATA]
	}
	
	const {
		lastname,
		firstname,
		country,
		age
	} = profile

	const errors: ValidateProfileError[] = []

	if (!lastname || !firstname) {
		errors.push(ValidateProfileError.INCORRECT_USER_DATA)
	}

	if (!age || !Number.isInteger(age) || !(age >= 0)) {
		errors.push(ValidateProfileError.INCORRECT_AGE)
	}

	if (!country) {
		errors.push(ValidateProfileError.INCORRECT_COUNTRY)
	}

	return errors
}