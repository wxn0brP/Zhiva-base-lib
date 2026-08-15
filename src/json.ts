import { existsSync, readFileSync } from "fs";

export function loadJson<T = Record<string, any>>(
	path = "package.json",
	def = {} as T,
) {
	if (!existsSync(path)) return def;
	return JSON.parse(readFileSync(path, "utf-8"));
}
