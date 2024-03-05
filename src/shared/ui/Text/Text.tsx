import { classNames } from "shared/lib/classNames/classNames"
import React from "react"
import cls from "./Text.module.scss"

export enum TextTheme {
	PRIMARY = "primary",
	ERROR = "error"
}

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
} // специальный тип html тега

export const Text = (props: TextProps) => {

	const { 
		className,
		title,
		text,
		theme = TextTheme.PRIMARY
	} = props

	const mods = {
		[cls[theme]]: true 
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