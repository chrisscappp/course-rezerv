import React, { memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Code.module.scss"

interface ArticleDetailsProps {
	className?: string;
	children: ReactNode;
}

export const Code = memo((props: ArticleDetailsProps) => {

	const {
		className,
		children
	} = props

	return (
		<pre>
			<code className = {classNames(cls.Code, {}, [className])}>
				{children}
			</code>
		</pre> // сохраняет все пробелы и переносы
	)
})