import { spawn } from "child_process";

const dir = process.env.HOME + "/.zhiva";
const zhiva = dir + "/zhiva";

export function openWindow(url: string | number, title?: string) {
    const proc = spawn(
        zhiva,
        [url.toString(), title ? title : ""],
    )

    return proc;
}