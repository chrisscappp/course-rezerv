/* eslint-disable i18next/no-literal-string */
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./BugButton.module.scss"
import { Button } from "shared/ui/Button/Button";
import { useEffect, useState } from "react";

interface BugButtonProps {
	className?: string;
}

// Компонент для тестирования
export const BugButton = ({ className }: BugButtonProps) => {

	const [ error, setError ] = useState<boolean>(false)

	const onThrow = () => {
		setError(!error)
	}

	useEffect(() => {
		if (error) {
			throw new Error("Bug button")
		}
	}, [error])

	return (
		<Button 
			className = {classNames(cls.PageError, {}, [className])}
			onClick = {onThrow}
		>
			throw error
    	</Button>
	)
}