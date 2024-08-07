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
		if (onScrollEnd) {
			const options = {
				root: wrapperRef.current, // обертка в которой происходит скролл
				rootMargin: '0px',
				threshold: 1.0
			}

			// принимает массив элементов, за которыми идет наблюдение
			observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					onScrollEnd()
				}
			}, options)

			observer.observe(triggerRef.current)
		}
		

		return () => {
			if (observer) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(triggerRef.current)
			}
		}
	}, [onScrollEnd, triggerRef, wrapperRef])
}