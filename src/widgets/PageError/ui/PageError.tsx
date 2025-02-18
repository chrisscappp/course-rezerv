import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./PageError.module.scss"
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";
import React from "react";

interface PageErrorProps {
	className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {

	const { t } = useTranslation("")

	const reloadPage = () => {
		location.reload()
	}

	return (
		<div className = {classNames(cls.PageError, {}, [className])}>
			<div className = {cls.content}>
				<p>{t("Непредвиденная ошибка")}</p>
				<div className = {cls.contentBtn}>
					<Button 
						onClick = {reloadPage}
					>
						{t("Обновить страницу")}
					</Button>
				</div>
			</div>
    	</div>
	)
}