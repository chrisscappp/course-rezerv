import { ProfileCard, profileReducer } from "enitites/Profile";
import { memo } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import React, { useEffect } from "react"
import { fetchProfileData } from "enitites/Profile"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ProfilePageProps {
	className?: string;
}

const reducers: ReducersList = {
	profile: profileReducer
}

const ProfilePage = ({ className }: ProfilePageProps) => {

	const { t } = useTranslation("profile")
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchProfileData())
	}, [dispatch])	

	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			<div className = {classNames("", {}, [className])}>
				<ProfileCard/>
			</div>
		</DynamicModuleLoader>
		
	)
}

export default memo(ProfilePage)