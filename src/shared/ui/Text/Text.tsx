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
	"data-testid"?: string
} // специальный тип html тега

export const Text = (props: TextProps) => {

	const { 
		className,
		title,
		text,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M,
		"data-testid": dataTestId = 'Text'
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
			{title && (
				<p 
					className={cls.title}
					data-testid={`${dataTestId}.Header`}
				>
					{title}
				</p>
			)}
			{text && (
				<p 
					className={cls.text}
					data-testid={`${dataTestId}.Paragraph`}
				>
					{text}
				</p>
			)}
		</div>
	)
}