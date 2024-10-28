import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Page.module.scss"
import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from "react"
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { getScrollRestoringScrollByPath, scrollRestoringActions } from "widgets/ScrollRestoring"
import { useLocation } from "react-router-dom"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useSelector } from "react-redux"
import { StateSchema } from "app/providers/StoreProvider"
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle"
import { PAGE_ID } from "shared/consts/elementsId"
import { VStack } from "shared/ui/Stack"

interface PageProps {
	className?: string,
	children: ReactNode,
	onScrollEnd?: () => void,
	saveScroll?: boolean
}

export const Page = memo((props: PageProps) => {
	
	const { 
		className,
		children,
		onScrollEnd,
		saveScroll = false
	} = props

	const { pathname } = useLocation()
	const dispatch = useAppDispatch()
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
	// закинули враппер на компонент В КОТОРОМ скролл
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
	// закинули триггер на компонент ЗА КОТОРЫМ СЛЕДИМ
	const scrollPosition = useSelector((state: StateSchema) =>
		getScrollRestoringScrollByPath(state, pathname)
	);

	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition;
	}, [])

	useInfiniteScroll({
		triggerRef,
		wrapperRef,
		onScrollEnd
	})

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(
			scrollRestoringActions.setScrollPosition({
				path: location.pathname,
				position: e?.currentTarget.scrollTop,
			})
		);
	}, 500)
	
	return (
		<section 
			className = {classNames(cls.Page, {}, [className])}
			ref = {wrapperRef}
			onScroll={onScroll}
			id={PAGE_ID}
		>
			{children}
			{onScrollEnd ? <div className = {cls.trigger} ref = {triggerRef} /> : null}
		</section>
	)
})