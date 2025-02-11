import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleCodeBlockComponent.module.scss"
import { ArticleBlockCode } from "../../model/types/article";
import { Code } from "@/shared/ui/Code";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import CopyIcon from "@/shared/assets/icons/copy-icon.svg"

interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleBlockCode;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {

	const {
		className,
		block
	} = props

	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(block.code)
	}, [block.code])

	return (
		<div className = {classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
			<Button 
				theme = {ButtonTheme.CLEAR} 
				className = {cls.copyBtn}
				onClick = {onCopy}
			>
				<CopyIcon className = {cls.copyIcon}/>
			</Button>
			<Code>
				{block.code}
			</Code>
		</div>
	)
})