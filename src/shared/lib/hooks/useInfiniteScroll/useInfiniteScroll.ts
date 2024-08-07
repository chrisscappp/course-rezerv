import { MutableRefObject, useEffect } from "react";

export interface UseInfiniteScrollProps {
	onScrollEnd?: () => void, // ф-ия, вызванная при триггере
	triggerRef: MutableRefObject<HTMLElement>, // реф, на который тригеррится обсервер
	wrapperRef: MutableRefObject<HTMLElement> // реф, внутри которого происходит скролл
	// в нашем случае это Page (компонент)
	// бывают врапперы на весь документ, когда нету компонента, но не в нашем случае
}

export function useInfiniteScroll(props: UseInfiniteScrollProps) {
	
	const {
		onScrollEnd, triggerRef, wrapperRef
	} = props

	useEffect(() => {
		let observer: IntersectionObserver | null = null
		const wrapperElement = wrapperRef.current
		const triggerElement = triggerRef.current
		// замкнули значения рефов, чтобы запомнить их
		// данные могут перезатерется. тут они остаются старыми
		// в таком случае они доступны useEffect даже после размонитрования компонента

		if (onScrollEnd) {
			const options = {
				root: wrapperElement, // обертка в которой происходит скролл
				rootMargin: '0px',
				threshold: 1.0
			}

			// принимает массив элементов, за которыми идет наблюдение
			observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					onScrollEnd()
				}
			}, options)

			observer.observe(triggerElement)
		}
		

		return () => {
			if (observer && triggerElement) {
				debugger
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(triggerElement)
			}
		}
	}, [onScrollEnd, triggerRef, wrapperRef])
}