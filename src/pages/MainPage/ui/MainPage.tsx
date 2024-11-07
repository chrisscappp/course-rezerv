import { useTranslation } from "react-i18next"
import React, { memo } from "react"
import { Page } from "widgets/Page/Page"
import { ListBox } from "shared/ui/ListBox/ListBox"

const MainPage = () => {

	const { t } = useTranslation("main")

	return (
		<Page>
			{t("Главная страница")}
			<ListBox
				onChange={(value: string) => {}}
				defaultValue="Выберите значение"
				value={undefined}
				items={[
					{ value: "1", content: "1" },
					{ value: "2", content: "2" },
					{ value: "3", content: "3" },
				]}
			/>
		</Page>
	)
}

export default memo(MainPage)