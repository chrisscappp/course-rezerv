export enum ValidateProfileError {
	INCORRECT_USER_DATA = "INCORRECT_USER_DATA",
	INCORRECT_AGE = "INCORRECT_AGE",
	INCORRECT_COUNTRY = "INCORRECT_COUNTRY",
	NO_DATA = "NO_DATA",
	SERVER_ERROR = "SERVER_ERROR"
}
// т.к. enum не относится к типу (в жс это константный объект), то выносим его в модуль констант