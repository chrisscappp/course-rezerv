import { classNames } from "@/shared/lib/classNames/classNames"
import React, { Suspense }  from "react";
import { Modal } from "@/shared/ui/Modal";
import { RegisterFormAsync } from "../RegisterForm/RegisterForm.async";
import { Spinner } from "@/shared/ui/Spinner";

interface RegisterModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const RegisterModal = ({ className, isOpen, onClose }: RegisterModalProps) => {

	return (
		<Modal 
			className = {classNames('', {}, [className])}
			isOpen = {isOpen}
			onClose = {onClose}
			lazy
		>
			<Suspense fallback = {<Spinner/>}>
				<RegisterFormAsync
					onSuccess = {onClose}
				/>
			</Suspense>
		</Modal>
	)
}