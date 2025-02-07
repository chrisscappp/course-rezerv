import { Mods, classNames } from "@/shared/lib/classNames/classNames"
import { ReactNode } from "react";
import React from "react"
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss"
import { Overlay } from "../Overlay/Overlay";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "../../lib/hooks/useTheme/useTheme";

interface ModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
	children?: ReactNode;
} // специальный тип html тега

export const Modal = (props: ModalProps) => {

	const { 
		className,
		isOpen,
		onClose, // если изменится onClose, то произойдёт перерендер компонента
		lazy,
		children
	} = props

	const { close, isClosing, isMounted } = useModal({ 
		animationDelay: 300,
		isOpen,
		onClose
	})
	const { theme } = useTheme()

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing
	}

	if (lazy && !isMounted) {
		return null
	}

	return (
		<Portal>
			<div 
				className={classNames(cls.Modal, mods, [className, theme, "app_modal"])}
				// вешаем класс темы в модальное окно
			>
				<Overlay onClick={close}/>
				<div className={classNames(cls.content, {[cls.contentOpened]: isOpen})}>
					{children}
				</div>
			</div>
		</Portal>
			
	)
}