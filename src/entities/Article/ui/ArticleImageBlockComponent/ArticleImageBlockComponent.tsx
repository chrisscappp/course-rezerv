import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleImageBlockComponent.module.scss"
import { ArticleBlockImage} from "../../model/types/article";
import { Text, TextAlign } from "@/shared/ui/Text/Text";

interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleBlockImage;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {

	const {
		className,
		block
	} = props

	return (
		<div className = {classNames(cls.ArticleImageBlockComponent, {}, [className])}>
			<img 
				src = {block.src} 
				alt = {block.title} 
				className = {cls.img}
			/>
			<Text
				title = {block.title}
				className = {cls.title}
				align = {TextAlign.CENTER}
			/>
		</div>
	)
})