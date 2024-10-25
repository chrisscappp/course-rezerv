import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./CommentList.module.scss"
import { Text } from "shared/ui/Text/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../model/types/comment"

interface CommentListProps {
	className?: string;
	comments: Comment[];
	isLoading: boolean | undefined;
}

export const CommentList = (props: CommentListProps) => {

	const { t } = useTranslation()

	const {
		className,
		comments,
		isLoading
	} = props

	return (
		<div className = {classNames(cls.CommentList, {}, [className])}>
			{
				comments?.length > 0 ? 
					comments?.map((comment: Comment) => (
						<CommentCard
							key = {comment.text}
							comment = {comment}
							isLoading = {isLoading}
							className = {cls.commentCard}
						/>
					)) 
					: <Text text = {t("Комментариев нет")}/>
			}
		</div>
	)
}