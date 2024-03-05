import { classNames } from "shared/lib/classNames/classNames"
import React from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { RegisterForm } from "../RegisterForm/RegisterForm";

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
			<RegisterForm/>
		</Modal>
	)
}