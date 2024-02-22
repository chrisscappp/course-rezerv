/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { useCollapsed } from "app/providers/SidebarProvider";
import { useTranslation } from "react-i18next";
import React, { useCallback, useState } from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { ButtonTheme, Button } from "shared/ui/Button/Button";

interface NavbarProps {
	className?: string;
} // доп классname

export const Navbar = ({ className }: NavbarProps) => {

	//const { toggleCollapsed } = useCollapsed()
	const { t } = useTranslation("navbar")

	const [ isAuthModal, setIsAuthModal ] = useState<boolean>(false)

	const onToggleAuthModal = useCallback(() => {
		setIsAuthModal(prev => !prev)
	}, [])
	// ссылки на ф-ии которые мы передаем пропсами всегда надо сохранять
	// во избежание лишних рендеров

	return (
		<div className = {classNames(cls.Navbar, {}, [className])}>
			<div className = {cls.btns}>
				<Button 
					theme = {ButtonTheme.OUTLINE}
					onClick = {onToggleAuthModal}
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
			
			<Modal
				isOpen = {isAuthModal}
				onClose = {onToggleAuthModal}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor molestias iusto dolorem quam necessitatibus quae quis doloremque ut expedita, tempora provident dolore atque voluptatem aspernatur possimus error aut sequi?
			</Modal>
		</div>
	)
}

// компоненты не требующие асинхронного чанка экспортируем именованным образом