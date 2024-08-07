import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Page.module.scss"
import { memo, MutableRefObject, ReactNode, useRef } from "react"
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll"

interface PageProps {
	className?: string,
	children: ReactNode,
	onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
	
	const { 
		className,
		children,
		onScrollEnd
	} = props

	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
	// закинули враппер на компонент В КОТОРОМ скролл
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
	// закинули триггер на компонент ЗА КОТОРЫМ СЛЕДИМ

	useInfiniteScroll({
		triggerRef,
		wrapperRef,
		onScrollEnd
	})
	
	return (
		<section 
			className = {classNames(cls.Page, {}, [className])}
			ref = {wrapperRef}
		>
			{children}
			<div ref = {triggerRef} />
		</section>
	)
})