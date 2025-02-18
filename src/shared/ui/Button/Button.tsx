import { Mods, classNames } from "@/shared/lib/classNames/classNames"
import { ButtonHTMLAttributes, FC, ReactNode, memo } from "react";
import React from "react"
import cls from "./Button.module.scss"

export enum ButtonTheme {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clearInverted',
	ERROR = 'error',
	OUTLINE = 'outline',
	OUTLINE_RED = 'outline_red',
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
	children?: ReactNode;
	fullWidth?: boolean;
} // специальный тип html тега

export const Button = memo((props: ButtonProps) => {

	const { 
		className, 
		theme = ButtonTheme.BACKGROUND,
		children, 
		square,
		disabled,
		hoveredTheme,
		hovered,
		size = ButtonSize.M,
		fullWidth,
		...otherProps
	} = props

	const mods: Mods = {
		[cls[theme]]: true,
		[cls.square]: square,
		[cls[size]]: true,
		[cls.disabled]: disabled,
		[cls.hovered]: hovered,
		[cls.full]: fullWidth
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
})