import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { useTranslation } from "react-i18next";
import React, { useCallback, useState } from "react";
import { ButtonTheme, Button } from "shared/ui/Button/Button";
import { LoginModal } from "feautures/AuthByUsername";
import { RegisterModal } from "feautures/RegisterByUsername";
import { getUserAuthData } from "enitites/User/index"
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "enitites/User/index";

interface NavbarProps {
	className?: string;
} // доп классname

export const Navbar = ({ className }: NavbarProps) => {

	const { t } = useTranslation("navbar")
	const authData = useSelector(getUserAuthData)
	const dispatch = useDispatch()

	const [ isAuthModal, setIsAuthModal ] = useState<boolean>(false)
	const [ isRegModal, setIsRegModal ] = useState<boolean>(false)

	const onShowAuthModal = useCallback(() => {
		setIsAuthModal(true)
	}, [])
	// ссылки на ф-ии которые мы передаем пропсами всегда надо сохранять
	// во избежание лишних рендеров

	const onCloseAuthModal = useCallback(() => {
		setIsAuthModal(false)
	}, [])

	const onShowRegModal = useCallback(() => {
		setIsRegModal(true)
	}, [])

	const onCloseRegModal = useCallback(() => {
		setIsRegModal(false)
	}, [])

	const onLogout = useCallback(() => {
		dispatch(userActions.logout())
		onCloseAuthModal()
	}, [dispatch, onCloseAuthModal])

	if (authData) {
		return (
			<div className = {classNames(cls.Navbar, {}, [className])}>
				<div className = {cls.btns}>
					<Button 
						theme = {ButtonTheme.OUTLINE}
						onClick = {onLogout}
					>
						{t("Выйти")}
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className = {classNames(cls.Navbar, {}, [className])}>
			<div className = {cls.btns}>
				<Button 
					theme = {ButtonTheme.OUTLINE}
					onClick = {onShowAuthModal}
				>
					{t("Войти")}
				</Button>
				<Button 
					theme = {ButtonTheme.OUTLINE}
					className = {cls.regBtn}
					onClick = {onShowRegModal}
				>
					{t("Регистрация")}
				</Button>
			</div>
			{isAuthModal && 
			<LoginModal
				isOpen = {isAuthModal}
				onClose = {onCloseAuthModal}
			/> 
			}
			{isRegModal &&
			<RegisterModal
				isOpen = {isRegModal}
				onClose = {onCloseRegModal}
			/>
			}
			
		</div>
	)
}

// компоненты не требующие асинхронного чанка экспортируем именованным образом