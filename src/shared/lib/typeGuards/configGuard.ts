import webpack from "webpack"

export function isStringArr(arr: string[] | undefined): arr is string[] {
	return typeof arr !== "undefined"
}

export function isConfigModule(m: (webpack.RuleSetRule | "...")[] | undefined): m is (webpack.RuleSetRule | "...")[] {
	return typeof m !== "undefined"
}