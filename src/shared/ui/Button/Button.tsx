import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Button.module.scss"
import { ButtonHTMLAttributes, FC } from "react";
import React from "react"

export enum ButtonTheme {
	CLEAR = 'clear',
	ERROR = 'error',
	OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
} // специальный тип html тега

export const Button: FC<ButtonProps> = (props) => {

	const { 
		className, 
		theme,
		children, 
		...otherProps
	} = props

	return (
		<button 
			className = {classNames(cls.Button, {}, [className, cls[theme]])}
			{...otherProps} // подтянуть пропсы button-element
		>
			{children}
		</button>
	)
}