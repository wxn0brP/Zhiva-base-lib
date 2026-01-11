import { spawn } from "child_process";
import { homedir } from "os";
import { join, resolve } from "path";

let zhiva = process.env.ZHIVA_ENGINE || join(homedir(), ".zhiva/zhiva");
if (process.platform === "win32") zhiva += ".exe";

export function openWindow(url: string | number, title?: string) {
    const proc = spawn(
        resolve(zhiva),
        [url.toString(), title || ""]
    )

    return proc;
}