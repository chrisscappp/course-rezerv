import { classNames } from "shared/lib/classNames/classNames"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import cls from "./Navbar.module.scss"
import { useCollapsed } from "app/providers/SidebarProvider";
import { useTranslation } from "react-i18next";

interface NavbarProps {
	className?: string;
} // доп классname

export const Navbar = ({ className }: NavbarProps) => {

	//const { toggleCollapsed } = useCollapsed()
	const { t } = useTranslation("navbar")

	return (
		<div className = {classNames(cls.Navbar, {}, [className])}>
			<div className = {cls.links}>
				<AppLink 
					theme = {AppLinkTheme.PRIMARY} 
					to = {"/"} 
					className = {cls.mainLink}
				> 
					{t("Главная")}
				</AppLink>
				<AppLink 
					theme = {AppLinkTheme.PRIMARY} 
					to = {"/about"}
				> 
					{t("О сайте")} 
				</AppLink>
			</div>
		</div>
	)
}

// компоненты не требующие асинхронного чанка экспортируем именованным образом