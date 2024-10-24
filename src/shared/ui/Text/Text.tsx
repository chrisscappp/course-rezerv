import { classNames } from "shared/lib/classNames/classNames"
import React from "react"
import cls from "./Text.module.scss"

export enum TextTheme {
	PRIMARY = "primary",
	INVERTED = "inverted",
	ERROR = "error"
}

export enum TextAlign {
	RIGHT = "right",
	CENTER = "center",
	LEFT = "left"
}

export enum TextSize {
	S = "size_s",
	M = "size_m",
	L = "size_l",
	XL = "size_xl",
}

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
} // специальный тип html тега

export const Text = (props: TextProps) => {

	const { 
		className,
		title,
		text,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M
	} = props

	const mods = {
		[cls[theme]]: true,
		[cls[align]]: align,
		[cls[size]]: true
	}

	return (
		<div 
			className = {classNames(cls.Button, mods, [className])}
		>
			{title && <p className = {cls.title}>{title}</p>}
			{text && <p className = {cls.text}>{text}</p>}
		</div>
	)
}