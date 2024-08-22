/**
 * Функция получения параметров запроса, конвертация их в строку запроса
 * @param params 
 * @returns 
 */
export function getQueryParams(params: OptionalRecord<string, string>) {
	const searchParams = new URLSearchParams(window.location.search)
	// класс, который уже представляет из себя набор методов для работы
	// с параметрами запроса и строкой

	Object.entries(params).forEach(([name, value]) => {
		if (value !== undefined) {
			searchParams.set(name, value);
		}
	})

	return `?${searchParams}`
}