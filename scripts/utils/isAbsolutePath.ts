const layers = ["app", "pages", "widgets", "feautures", "entities", "shared"];

export function isAbsolutePath(value: string) {
	return layers.some((layer) => value.startsWith(layer));
}
