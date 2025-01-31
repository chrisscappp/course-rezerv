import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

interface UseModalProps {
	onClose?: () => void,
	isOpen?: boolean,
	animationDelay?: number
}

export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
	
	const [isClosing, setIsClosing] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
	
	useEffect(() => {
		if (isOpen) {
			setIsMounted(true)
		}
	}, [isOpen])
	// проверяем открытось модалки. если открылась - рендерим

	const close = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timerRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, animationDelay)
		}
	}, [animationDelay, onClose]) 
	// опциональный класс, зависящий от isClosing
	// если onClose изменится, то вернётся новая ссылка на ф-ию. мы обернули ф-ию в useCallback
	// следовательно она не изменится в памяти

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			close()
		}
	}, [close])
	// если в массиве зависимостей ничего не изменилось, то вернётся старая ссылка на ф-ию
	// следовательно перерендера ф-ии не будет. в памяти по ссылке она останется той же

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}
		
		return () => {
			clearTimeout(timerRef.current)
			removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])
	// кладём ф-ии, состояние от которых зависит этот хук

	return { isClosing, isMounted, close }
}