import { Suspense, memo, useCallback } from "react"
import { Route, Routes } from "react-router-dom"
import { AppRoutesProps, routeConfig } from "@/shared/config/routeConfig/routeConfig"
import { PageLoader } from "@/widgets/PageLoader/index"
import { RequireAuth } from "./RequireAuth"
import { RequiredRoles } from "./RequiredRoles"

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
					key = {route.path}
					path = {route.path}
					element = { 
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