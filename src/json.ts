import { existsSync, readFileSync } from "fs";

export function loadJson(path = "package.json", def = {}) {
    if (!existsSync(path)) return def;
    return JSON.parse(readFileSync(path, "utf-8"));
}