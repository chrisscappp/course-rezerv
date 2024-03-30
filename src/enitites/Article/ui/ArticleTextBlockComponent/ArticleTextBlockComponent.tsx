import React, { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleTextBlockComponent.module.scss"
import { Text } from "shared/ui/Text/Text";
import { ArticleBlockText } from "../../model/types/article"

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleBlockText;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {

	const {
		className,
		block
	} = props

	return (
		<div className = {classNames(cls.ArticleTextBlockComponent, {}, [className])}>
			{block.title && (
				<Text
					title = {block.title}
					className = {cls.title}
				/>
			)}
			{block.paragraphs.map(item => {
				return (
					<Text
						text = {item}
						key = {item}
						className = {cls.paragraph}
					/>
				)
			})}
		</div>
	)
})