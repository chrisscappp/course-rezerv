import { IUser } from "enitites/User";

export enum ArticleBlockType {
	CODE = "CODE",
	IMAGE = "IMAGE",
	TEXT = "TEXT"
}

export interface ArticleBlockBase {
	id: string;
	type: ArticleBlockType;
} 

export interface ArticleBlockText extends ArticleBlockBase {
	type: ArticleBlockType.TEXT;
	title?: string;
    paragraphs: string[];
} 

export interface ArticleBlockImage extends ArticleBlockBase {
	type: ArticleBlockType.IMAGE;
	src: string;
	title: string;
} 

export interface ArticleBlockCode extends ArticleBlockBase {
	type: ArticleBlockType.CODE
	code: string;
} 

export type ArticleBlock = ArticleBlockText | ArticleBlockImage | ArticleBlockCode

export enum ArticleSortType {
	VIEWS = "views",
	TITLE = "title",
	CREATED_AT = "createdAt"
}

export enum ArticleType {
	ALL = "ALL",
	IT = "IT",
	ECONOMICS = "ECONOMICS",
	SCIENCE = "SCIENCE",
	POLITICS = "POLITICS"
}

export enum ArticleView {
	TILE = "TILE",
	TILE_DETAIL = "TILE_DETAIL"
}

export interface Article {
	id: string;
    title: string;
    subtitle: string;
	user: IUser,
    img: string;
    views: number,
    createdAt: string,
    type: ArticleType[];
    blocks: ArticleBlock[];
}