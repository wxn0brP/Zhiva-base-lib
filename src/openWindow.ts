import { spawn } from "child_process";

const zhiva = process.env.HOME + "/.zhiva/zhiva";

export function openWindow(url: string | number, title?: string) {
    const proc = spawn(
        zhiva,
        [url.toString(), title ? title : ""],
    )

    return proc;
}