import { classNames } from "shared/lib/classNames/classNames"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import React from "react"
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss"

interface ModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	children?: ReactNode;
} // специальный тип html тега

const CLOSE_DELAY = 300

export const Modal = (props: ModalProps) => {

	const { 
		className,
		isOpen,
		onClose, // если изменится onClose, то произойдёт перерендер компонента
		children
	} = props

	const [ isClosing, setIsClosing ] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout>>()

	const handleClose = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timerRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, CLOSE_DELAY)
		}
	}, [onClose]) // опциональный класс, зависящий от isClosing
	// если onClose изменится, то вернётся новая ссылка на ф-ию. мы обернули ф-ию в useCallback
	// следовательно она не изменится в памяти

	const onClickContent = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			handleClose()
		}
	}, [handleClose])
	// если в массиве зависимостей ничего не изменилось, то вернётся старая ссылка на ф-ию
	// следовательно перерендера ф-ии не будет. в памяти по ссылке она останется той же

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}
		
		return () => {
			clearTimeout(timerRef.current)
			removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])
	// кладём ф-ии, состояние от которых зависит этот хук

	const mods: Record<string, boolean> = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing
	}

	return (
		<Portal>
			<div 
				className = {classNames(cls.Modal, mods, [className])}
			>
				<div className = {cls.overlay} onClick = {handleClose}>
					<div className = {classNames(cls.content, {[cls.contentOpened]: isOpen})} onClick = {onClickContent}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
			
	)
}