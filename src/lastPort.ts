import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const lastPortFile = join(process.cwd(), ".zhiva-port");

export function readLastPort(): number | null {
    if (!existsSync(lastPortFile)) return null;

    const value = Number(readFileSync(lastPortFile, "utf8"));
    return Number.isInteger(value) && value > 0 ? value : null;
}

export function saveLastPort(port: number) {
    try {
        writeFileSync(lastPortFile, String(port), "utf8");
    } catch (e) {
        console.error("[Z-BIB-2-01] Failed save last port", e);
    }
}