import { classNames } from "@/shared/lib/classNames/classNames"
import { Spinner } from "@/shared/ui/Spinner"
import React from "react";
import cls from "./PageLoader.module.scss"

interface PageLoaderProps {
	className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {

	return (
		<div 
			className = {classNames(cls.PageLoader, {}, [className])}
		>
			<Spinner/>
		</div>
	)
}