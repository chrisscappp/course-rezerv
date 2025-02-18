import React, { HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Card.module.scss"

export enum CardTheme {
	NORMAL = "normal",
	OUTLINED = "outlined"
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	theme?: CardTheme,
	fullWidth?: boolean
}

export const Card = memo((props: CardProps) => {

	const {
		className,
		children,
		theme = CardTheme.NORMAL,
		fullWidth,
		...otherProps
	} = props

	return (
		<div 
			className = {classNames(cls.Card, {[cls.full]: fullWidth}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</div>
	)
})