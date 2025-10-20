import { spawn } from "child_process";
import { homedir } from "os";
import { join, resolve } from "path";

const zhiva = join(homedir(), ".zhiva/zhiva");

export function openWindow(url: string | number, title?: string) {
    const proc = spawn(
        resolve(zhiva),
        [url.toString(), title ? title : ""],
    )

    return proc;
}