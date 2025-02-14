import { memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleSortSelector.module.scss";
import { Select, SelectOption } from "@/shared/ui/Select";
import { useTranslation } from "react-i18next";
import { ArticleSortType } from "@/entities/Article";
import { SortOrder } from "@/shared/types";
import { HStack } from "@/shared/ui/Stack";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortType,
  order: SortOrder,
  onChangeOrder: (newOrder: SortOrder) => void,
  onChangeSortType: (newSort: ArticleSortType) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
	const { 
		className, 
		onChangeOrder, 
		onChangeSortType, 
		order, 
		sort
	} = props;

	const { t } = useTranslation();

	const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
		{
			value: "asc",
			content: t("возрастанию")
		},
		{
			value: "desc",
			content: t("убыванию")
		}
	], [t])

	const sortTypeOptions = useMemo<SelectOption<ArticleSortType>[]>(() => [
		{
			value: ArticleSortType.CREATED_AT,
			content: t("дате создания")
		},
		{
			value: ArticleSortType.TITLE,
			content: t("названию")
		},
		{
			value: ArticleSortType.VIEWS,
			content: t("просмотрам")
		}
	], [t])

	return (
		<HStack className={classNames('', {}, [className])}>
			<Select<ArticleSortType> 
				label={t("Сортировать ПО")} 
				options = {sortTypeOptions}
				onChange = {onChangeSortType}
				value = {sort}
			/>
			<Select<SortOrder>
				label={t("по")} 
				options = {orderOptions}
				onChange = {onChangeOrder}
				value = {order}
				className = {cls.order}
			/>
		</HStack>
	);
});
