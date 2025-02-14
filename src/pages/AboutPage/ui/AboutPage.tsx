import { useTranslation } from "react-i18next"
import React, { memo } from "react"
import { Page } from "@/widgets/Page/ui/Page"

const AboutPage = () => {

	const { t } = useTranslation("about")

	return (
		<Page>
			{t("Страница о нас")}
		</Page>
	)
}

export default memo(AboutPage)