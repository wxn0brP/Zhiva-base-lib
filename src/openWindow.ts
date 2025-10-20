import { spawn } from "child_process";
import { homedir } from "os";

const zhiva = homedir() + "/.zhiva/zhiva";

export function openWindow(url: string | number, title?: string) {
    const proc = spawn(
        zhiva,
        [url.toString(), title ? title : ""],
    )

    return proc;
}