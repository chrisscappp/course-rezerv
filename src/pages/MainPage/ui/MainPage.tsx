import { useTranslation } from "react-i18next"
import React, { memo, useState } from "react"
import { Counter } from "enitites/Counter"
import { Input } from "shared/ui/Input/Input"

const MainPage = () => {

	const { t } = useTranslation("main")

	const [value, setValue] = useState<string>("")

	const onChange = (val: string) => {
		setValue(val)
	}

	return (
		<div>
			{t("Главная страница")}
			<Counter/>
			<Input
				placeholder = "Введите текст"
				onChange = {onChange}
				value = {value}
				
			/>
		</div>
	)
}

export default memo(MainPage)