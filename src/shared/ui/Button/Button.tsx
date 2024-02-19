import { classNames } from "shared/lib/classNames/classNames"
import { ButtonHTMLAttributes, FC } from "react";
import React from "react"
import cls from "./Button.module.scss"

export enum ButtonTheme {
	CLEAR = 'clear',
	ERROR = 'error',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
	S = "size_s",
	M = "size_m",
	L = "size_l",
	XL = "size_xl"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
} // специальный тип html тега

export const Button: FC<ButtonProps> = (props) => {

	const { 
		className, 
		theme,
		children, 
		square,
		size = ButtonSize.M,
		...otherProps
	} = props

	const mods: Record<string, boolean> = {
		[cls[theme]]: true,
		[cls.square]: square,
		[cls[size]]: true
	}

	return (
		<button 
			className = {classNames(cls.Button, mods, [className])}
			{...otherProps} // подтянуть пропсы button-element
		>
			{children}
		</button>
	)
}