import { getUserRoles, UserRoles } from "@/entities/User";
import { RouterPath } from "@/shared/consts/router";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RequiredRolesProps {
	children: JSX.Element,
	roles?: UserRoles[]
}

export function RequiredRoles({ children, roles }: RequiredRolesProps) {
	const userRoles = useSelector(getUserRoles)

	const hasRequiredAuth = useMemo(() => {
		if (!roles) return true

		return roles?.some(requiredRole => {
			return userRoles?.includes(requiredRole)
		})
	}, [roles, userRoles])

	if (!hasRequiredAuth) {
		return <Navigate to = {RouterPath.forbidden_page} replace/>
	}

	return children
}