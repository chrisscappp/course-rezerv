import { classNames } from "shared/lib/classNames/classNames"
import { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { useCollapsed } from "app/providers/SidebarProvider/lib/useCollapsed";
import { LangSwitcher } from "widgets/LangSwitcher"
import { Button } from "shared/ui/Button/Button";
import cls from "./SideBar.module.scss"

interface SidebarProps {
	className?: string;
} // доп класс

export const Sidebar = ({ className }: SidebarProps) => {

	const [ collapsed, setCollapsed ] = useState(true)

	const onToggle = () => {
		setCollapsed(prev => !prev)
	}

	//const { collapsed, toggleCollapsed } = useCollapsed()

	//console.log("COLLAPSED", collapsed)

	return (
		<div 
			className = {classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
			data-testid = "sidebar"
		>
			<Button 
				data-testid = "sidebar-toggle"
				onClick = {onToggle} 
				style = {{height: "20px", width: "20px"}}
			>
                -
			</Button>
			<div
				className = {classNames(cls.switchers, {}, [])}
			>
				<ThemeSwitcher/>
				{
					!collapsed ? 
						<LangSwitcher className = {cls.lang}/>
						: null
				}
				
			</div>
		</div>
	)
}