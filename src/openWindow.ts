import { spawn } from "bun";

const dir = process.env.HOME + "/.zhiva";
const zhiva = dir + "/zhiva";

export async function openWindow(url: string | number, title?: string) {
    const proc = spawn(
        [zhiva, url.toString(), title ? title : ""],
        {
            stdin: "pipe",
            stdout: "inherit",
            stderr: "inherit"
        }
    )

    return proc;
}