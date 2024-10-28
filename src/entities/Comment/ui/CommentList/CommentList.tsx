import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../model/types/comment"
import { VStack } from "shared/ui/Stack";

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
		<VStack
			max
			gap="16"
			className = {className}
		>
			{
				comments?.length > 0 ? 
					comments?.map((comment: Comment) => (
						<CommentCard
							key = {comment.text}
							comment = {comment}
							isLoading = {isLoading}
						/>
					)) 
					: <Text text = {t("Комментариев нет")}/>
			}
		</VStack>
	)
}