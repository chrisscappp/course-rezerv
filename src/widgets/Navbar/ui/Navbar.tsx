import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { useTranslation } from "react-i18next";
import React, { memo, useCallback, useState } from "react";
import { ButtonTheme, Button } from "shared/ui/Button/Button";
import { LoginModal } from "feautures/AuthByUsername";
import { RegisterModal } from "feautures/RegisterByUsername";
import { getUserAuthData, userActions } from "entities/User";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Avatar } from "shared/ui/Avatar/Avatar";

interface NavbarProps {
	className?: string;
} // доп классname

export const Navbar = memo(({ className }: NavbarProps) => {

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
			<header className = {classNames(cls.Navbar, {}, [className])}>
				<Text 
					className = {cls.appName} 
					title = {t("Articles App")}
					theme = {TextTheme.INVERTED}
				/>
				<AppLink 
					className = {cls.createLink}
					to={RouterPath.articles_create}
					theme = {AppLinkTheme.SECONDARY}
				>
					{t("Создать статью")}
				</AppLink>
				<Dropdown
					className={cls.dropdown}
					items={[
						{
							content: t("Профиль"),
							href: RouterPath.profile + authData.id
						},
						{
							content: t("Выйти"),
							onClick: onLogout
						}
					]}
					trigger={<Avatar size={30} src={authData.avatar}/>}
					direction="bottom left"
				/>
			</header>
		)
	}

	return (
		<header className = {classNames(cls.Navbar, {}, [className])}>
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
			
		</header>
	)
})

// компоненты не требующие асинхронного чанка экспортируем именованным образом