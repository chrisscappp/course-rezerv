import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')
// таким образом можно вытащить тип импортируемого модуля
// не влияет на размер бандла, т.к. они туда не попадают

interface AnimationContextPayload {
	Spring?: SpringType,
	Gesture?: GestureType,
	isLoaded?: boolean
}

const AnimationContext = createContext<AnimationContextPayload>({})

const getAsyncAnimationModules = () => {
	return Promise.all([
		import('@react-spring/web'),
		import('@use-gesture/react')
	])
	// используем асинхронный импорт для загрузки библиотек
	// они подтянутся в бандл только в нужный момент (конструкция import)
	// т.к. в тандеме они используются, то грузим их вместе
	// если бы были не в тандеме - можно по очереди 
}

export const useAnimationLibs = () => {
	return useContext(AnimationContext) as Required<AnimationContextPayload>
	// чтобы после подgрузки типы были не undefined
}

export const AnimationProvider = ({ children }: { children: ReactNode }) => {

	const SpringRef = useRef<SpringType>()
	const GestureRef = useRef<GestureType>()
	// чтобы от рендера к рендеру был доступ к значениям
	// т.к. между рендерами реф не изменяется

	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		getAsyncAnimationModules().then(([Spring, Gesture]) => {
			SpringRef.current = Spring
			GestureRef.current = Gesture
			setIsLoaded(true)
		})
		// подгрузили 1 раз - больше они загружаться не будут
	}, [])

	const defaultProps = useMemo<AnimationContextPayload>(() => {
		return {
			Gesture: GestureRef.current,
			Spring: SpringRef.current,
			isLoaded
		}
	}, [isLoaded])

	return (
		<AnimationContext.Provider value={defaultProps}>
			{children}
		</AnimationContext.Provider>
	)
}
