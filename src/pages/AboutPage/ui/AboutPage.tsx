import { useTranslation } from "react-i18next"
import React, { memo } from "react"

const AboutPage = () => {

	const { t } = useTranslation("about")

	return (
		<div>
			{t("Страница о нас")}
		</div>
	)
}

export default memo(AboutPage)