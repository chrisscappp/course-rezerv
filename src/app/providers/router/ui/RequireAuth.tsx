import { getUserAuthData } from "enitites/User"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { RouterPath } from "shared/config/routeConfig/routeConfig"

export function RequireAuth({ children }: {children: JSX.Element}) {
	let auth = useSelector(getUserAuthData)
	let location = useLocation()

	if (!auth) {
		return <Navigate to = {RouterPath.main} state = {{from: location}} replace/>
	}

	return children
}