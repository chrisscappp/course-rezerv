import { TabItem, Tabs } from "shared/ui/Tabs/Tabs"
import { ArticleType } from "entities/Article"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"

interface ArticleTypeTabsProps {
	className?: string,
	onChangeArticleType: (tab: TabItem<ArticleType>) => void,
	value: ArticleType
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {

	const {
		onChangeArticleType,
		value,
		className
	} = props

	const { t } = useTranslation();

	const tabItems = useMemo<TabItem<ArticleType>[]>(() => [
		{ value: ArticleType.ALL, content: t("Все") },
		{ value: ArticleType.ECONOMICS, content: t("Экономика") },
		{ value: ArticleType.IT, content: t("Айти") },
		{ value: ArticleType.SCIENCE, content: t("Наука") },
		{ value: ArticleType.POLITICS, content: t("Политика") }
	], [t]);

	return (
		<Tabs
			className = {classNames("", {}, [className])}
			onTabClick = {onChangeArticleType}
			tabs = {tabItems}
			value = {value}
		/>
	)
}