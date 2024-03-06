import { FC, lazy } from "react";
import { RegisterFormProps } from "./RegisterForm";

export const RegisterFormAsync = lazy<FC<RegisterFormProps>>(() => new Promise(resolve => {
	//@ts-ignore
	setTimeout(() => resolve(import("./RegisterForm")), 1500)
	// академический пример задержки
}))