import { useTranslation } from "react-i18next"
import React from "react"
import { Counter } from "enitites/Counter"
import { Input } from "enitites/Input"

const MainPage = () => {

	const { t } = useTranslation("main")

	return (
		<div>
			{t("Главная страница")}
			<Counter/>
			<Input/>
		</div>
	)
}

export default MainPage