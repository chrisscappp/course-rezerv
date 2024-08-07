import { useTranslation } from "react-i18next"
import React, { memo, useState } from "react"
import { Counter } from "enitites/Counter"
import { Input } from "shared/ui/Input/Input"
import { Page } from "shared/ui/Page/Page"

const MainPage = () => {

	const { t } = useTranslation("main")

	const [value, setValue] = useState<string>("")

	const onChange = (val: string) => {
		setValue(val)
	}

	return (
		<Page>
			{t("Главная страница")}
			<Counter/>
			<Input
				placeholder = "Введите текст"
				onChange = {onChange}
				value = {value}
				
			/>
		</Page>
	)
}

export default memo(MainPage)