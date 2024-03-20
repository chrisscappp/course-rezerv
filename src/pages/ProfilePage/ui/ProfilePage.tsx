import { memo } from "react";
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import React from "react"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { editableProfileReducer, EditableProfileCard } from "feautures/EditableProfileCard";

interface ProfilePageProps {
	className?: string;
}

const reducers: ReducersList = {
	editableProfile: editableProfileReducer
}

const ProfilePage = ({ className }: ProfilePageProps) => {

	const { t } = useTranslation("profile")

	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			<div className = {classNames("", {}, [className])}>
				<ProfilePageHeader/>
				<EditableProfileCard/>
			</div>
		</DynamicModuleLoader>
	)
}

export default memo(ProfilePage)