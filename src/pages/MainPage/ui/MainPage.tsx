import { useTranslation } from "react-i18next"
import React from "react"
import { Counter } from "enitites/Counter"

const MainPage = () => {

	const { t } = useTranslation("main")

	return (
		<div>
			{t("Главная страница")}
			<Counter/>
		</div>
	)
}

export default MainPage