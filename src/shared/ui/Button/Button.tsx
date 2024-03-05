import { classNames } from "shared/lib/classNames/classNames"
import { ButtonHTMLAttributes, FC } from "react";
import React from "react"
import cls from "./Button.module.scss"

export enum ButtonTheme {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clearInverted',
	ERROR = 'error',
	OUTLINE = 'outline',
	OUTLINE_INVERTED = 'outlineInverted',
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
	disabled?: boolean;
	hoveredTheme?: ButtonTheme;
	hovered?: boolean;
} // специальный тип html тега

export const Button: FC<ButtonProps> = (props) => {

	const { 
		className, 
		theme,
		children, 
		square,
		disabled,
		hoveredTheme,
		hovered,
		size = ButtonSize.M,
		...otherProps
	} = props

	const mods: Record<string, boolean> = {
		[cls[theme]]: true,
		[cls.square]: square,
		[cls[size]]: true,
		[cls.disabled]: disabled,
		[cls.hovered]: hovered
	}

	return (
		<button 
			className = {classNames(cls.Button, mods, [className])}
			disabled = {disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
}