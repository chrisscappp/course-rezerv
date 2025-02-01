import { classNames, Mods } from "@/shared/lib/classNames/classNames"
import cls from "./Avatar.module.scss"
import React, { CSSProperties, useMemo } from "react";

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
}

// eslint-disable-next-line max-len
const defSrc = "https://steamuserimages-a.akamaihd.net/ugc/5112180131487327452/50B407366450351DC0CA8BE714805810DC8EC6B1/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {

	const mods: Mods = {}

	const styles = useMemo<CSSProperties>(() => {
		return {
			width: size || 100,
			height: size || 100
		}
	}, [size])
	// в useMemo тк передаем styles как props в компонент

	return (
		<img 
			alt = {alt}
			src = {src || defSrc}
			style = {styles}
			className = {classNames(cls.Avatar, {}, [className])}
		/>
	)
}