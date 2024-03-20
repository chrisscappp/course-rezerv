import { getUserAuthData } from "enitites/User"
import { Suspense, memo, useMemo } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routeConfig/routeConfig"
import { PageLoader } from "widgets/PageLoader/index"

const AppRouter = () => {
	
	const authData = useSelector(getUserAuthData)

	const routes = useMemo(() => {
		return Object.values(routeConfig).filter(item => {
			return (item.authOnly && !authData) ? false : true 
		})
	}, [authData])

	return (
		<>
			<Suspense fallback = {<PageLoader/>}>
				<Routes>
					{routes.map(({ path, element }) => {
						return (
							<Route
								key = {path}
								path = {path}
								element = {
									<div className = "page-wrapper">{element}</div>
								}
							/>
						)
					})}
				</Routes>
			</Suspense>
		</>
	)
}

export default memo(AppRouter)