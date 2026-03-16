import { spawn } from "child_process";
import { homedir } from "os";
import { join, resolve } from "path";

let zhiva: string;

if (process.env.ZHIVA_ENGINE)
    zhiva = process.env.ZHIVA_ENGINE;
else if (process.env.ZHIVA_ROOT)
    zhiva = join(process.env.ZHIVA_ROOT, "zhiva");
else
    zhiva = join(homedir(), ".zhiva", "zhiva");

if (process.platform === "win32" && !zhiva.toLowerCase().endsWith(".exe"))
    zhiva += ".exe";

export function openWindow(url: string | number, title?: string) {
    const proc = spawn(
        resolve(zhiva),
        [url.toString(), title || ""],
        {
            stdio: "inherit"
        }
    )

    return proc;
}
