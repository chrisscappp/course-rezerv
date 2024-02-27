/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { useCollapsed } from "app/providers/SidebarProvider";
import { useTranslation } from "react-i18next";
import React, { useCallback, useState } from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { ButtonTheme, Button } from "shared/ui/Button/Button";
import { LoginModal } from "feautures/AuthByUsername";

interface NavbarProps {
	className?: string;
} // доп классname

export const Navbar = ({ className }: NavbarProps) => {

	//const { toggleCollapsed } = useCollapsed()
	const { t } = useTranslation("navbar")

	const [ isAuthModal, setIsAuthModal ] = useState<boolean>(false)

	const onShowModal = useCallback(() => {
		setIsAuthModal(true)
	}, [])
	// ссылки на ф-ии которые мы передаем пропсами всегда надо сохранять
	// во избежание лишних рендеров

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false)
	}, [])

	return (
		<div className = {classNames(cls.Navbar, {}, [className])}>
			<div className = {cls.btns}>
				<Button 
					theme = {ButtonTheme.OUTLINE}
					onClick = {onShowModal}
				>
					{t("Войти")}
				</Button>
				<Button 
					theme = {ButtonTheme.OUTLINE}
					className = {cls.regBtn}
				>
					{t("Регистрация")}
				</Button>
			</div>
			
			<LoginModal
				isOpen = {isAuthModal}
				onClose = {onCloseModal}
			/>
		</div>
	)
}

// компоненты не требующие асинхронного чанка экспортируем именованным образом