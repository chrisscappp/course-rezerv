import { EntityState } from "@reduxjs/toolkit";
import { Comment } from "@/entities/Comment";

// унаследовали тип стейта. под капотом у него массив айди. женериком передаем тип сущности
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
	isLoading: boolean;
	error?: string;
}