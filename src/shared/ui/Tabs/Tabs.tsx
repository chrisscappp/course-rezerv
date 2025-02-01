import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./Tabs.module.scss"
import { ReactNode, useCallback } from "react"
import { Card, CardTheme } from "../Card/Card"

export interface TabItem<T> {
	value: T,
	content: ReactNode
}

interface TabsProps<T> {
	className?: string,
	tabs: TabItem<T>[],
	value: T,
	onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
	
	const {
		className,
		onTabClick,
		tabs,
		value
	} = props

	const handleClick = useCallback((tab: TabItem<T>) => {
		return () => {
			onTabClick(tab)
		}
	}, [onTabClick])
	// замкнули ф-ию чтобы избежать передачу ивента

	return (
		<div className = {classNames(cls.Tabs, {}, [className])}>
			{tabs.map(tab => (
				<Card
					theme = {tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED} 
					key = {tab.value}
					className = {cls.tab}
					onClick = {handleClick(tab)}
				>
					{tab.content}
				</Card>
			))}
		</div>
	)
}