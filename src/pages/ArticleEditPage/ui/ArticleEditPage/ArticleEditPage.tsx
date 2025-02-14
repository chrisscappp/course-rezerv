import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./ArticleEditPage.module.scss";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page/ui/Page";
import { useTranslation } from "react-i18next";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
	
	const {
		className
	} = props

	const { id } = useParams<{id: string}>()
	const { t } = useTranslation()
	const isEdit = Boolean(id)
	// удобная проверка на наличие id
	// если редактирование не отличается кардинально от создания
	// то делаем всё в рамках одной страницы, но отображаем соот. компоненты
	// в зависимости от условия

	return (
		<Page className={classNames(cls.ArticleEditPage, {}, [className])}>
			{isEdit
				? t("Редактирование статьи с id = ") + id
				: t("Создание новой статьи")}
		</Page>
	);
}

export default memo(ArticleEditPage);