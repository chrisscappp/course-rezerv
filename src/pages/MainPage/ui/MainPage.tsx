import { useTranslation } from "react-i18next"
import React, { memo } from "react"
import { Page } from "@/widgets/Page/Page"

const MainPage = () => {

	const { t } = useTranslation("main")

	return (
		<Page>
			{t("Главная страница")}
		</Page>
	)
}

export default memo(MainPage)