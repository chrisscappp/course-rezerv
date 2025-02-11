import { classNames } from "@/shared/lib/classNames/classNames"
import React, { Suspense } from "react";
import { Modal } from "@/shared/ui/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import { Spinner } from "@/shared/ui/Spinner";

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {

	return (
		<Modal 
			className = {classNames('', {}, [className])}
			isOpen = {isOpen}
			onClose = {onClose}
			lazy
		>
			<Suspense fallback = {<Spinner/>}>
				<LoginFormAsync
					onSuccess = {onClose}
				/>
			</Suspense>
		</Modal>
	)
}