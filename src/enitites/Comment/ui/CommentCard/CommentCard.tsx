import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Comment } from "../../model/types/comment"
import cls from "./CommentCard.module.scss"
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text, TextSize } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RouterPath } from "shared/config/routeConfig/routeConfig";

interface CommentCardProps {
	className?: string;
	comment: Comment;
	isLoading: boolean | undefined;
}

export const CommentCard = (props: CommentCardProps) => {

	const {
		className,
		comment,
		isLoading
	} = props

	if (isLoading) {
		return (
			<div className = {classNames(cls.CommentCard, {}, [className])}>
				<div className = {cls.header}>
					<Skeleton border = {"50%"} width={30} height={30}/>
					<Skeleton className = {cls.username} width={100} height={20} />
				</div>
				<Skeleton className = {cls.commentText} width={"100%"} height={60} />
			</div>
		)
	}

	return (
		<div className = {classNames(cls.CommentCard, {}, [className])}>
			<AppLink to = {`${RouterPath.profile}${comment.user.id}`} className = {cls.header}>
				{comment.user.avatar && <Avatar size = {30} src = {comment.user.avatar}/>}
				<Text text = {comment.user.username} className = {cls.username} size = {TextSize.L}/>
			</AppLink>
			<Text className = {cls.commentText} text = {comment?.text}/>
		</div>
	)
}