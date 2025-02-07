import { Suspense, memo, useCallback } from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "../config/routerConfig"
import { PageLoader } from "@/widgets/PageLoader"
import { RequireAuth } from "./RequireAuth"
import { RequiredRoles } from "./RequiredRoles"
import { AppRoutesProps } from "@/shared/types/router"

const AppRouter = () => {
	
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = (
			<Suspense fallback = {<PageLoader/>}>
				{route.element}
			</Suspense>
		)
		
		return (
			<>
				<Route
					key={route.path}
					path={route.path}
					element={ 
						route.authOnly ? (
							<RequireAuth>
								<RequiredRoles roles={route.roles}>
									{element}
								</RequiredRoles>
							</RequireAuth> 
						) : element
					}
				/>
			</>
		)
	}, [])

	return (
		<>
			<Suspense fallback = {<PageLoader/>}>
				<Routes>
					{Object.values(routeConfig).map(renderWithWrapper)}
				</Routes>
			</Suspense>
		</>
	)
}

export default memo(AppRouter)