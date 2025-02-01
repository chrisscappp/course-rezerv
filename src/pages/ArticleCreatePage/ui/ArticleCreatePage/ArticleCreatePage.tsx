import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./ArticleCreatePage.module.scss";
import { memo } from "react";

interface ArticleCreatePageProps {
  className?: string;
}

const ArticleCreatePage = (props: ArticleCreatePageProps) => {
	
	const {
		className
	} = props
	
	return (
		<div className={classNames(cls.ArticleCreatePage, {}, [className])}>
			article create page
		</div>
	);
}

export default memo(ArticleCreatePage)