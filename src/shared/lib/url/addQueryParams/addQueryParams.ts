import { getQueryParams } from "../getQueryParams/getQueryParams";

/**
 * Функция добавления параметров в строку запроса
 * @param params 
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
	window.history.pushState(null, "", getQueryParams(params));
}