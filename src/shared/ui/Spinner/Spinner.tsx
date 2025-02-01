import { classNames } from "@/shared/lib/classNames/classNames"
import React from "react";
import "./Spinner.scss"

interface SpinnerProps {
	className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {

	return (
		<div className = {classNames("loader", {}, [className])}></div>
	)
}