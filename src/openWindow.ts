import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { homedir } from "os";
import { join, resolve } from "path";

let zhiva = process.env.ZHIVA_ENGINE || join(homedir(), ".zhiva/zhiva");
if (process.platform === "win32") zhiva += ".exe";

export interface ZhivaWindow extends ChildProcessWithoutNullStreams {
    ipc: {
        send(data: any): void;
        on(handler: (data: any) => void): void;
    };
}

export function openWindow(url: string | number, title?: string): ZhivaWindow {
    const proc = spawn(
        resolve(zhiva),
        [url.toString(), title || ""]
    ) as ZhivaWindow;

    proc.ipc = {
        send: (data: any) => {
            proc.stdin.write(`[JSON]${JSON.stringify(data)}[/JSON]\n`);
        },
        on: (handler: any) => {
            proc.stdout.on("data", (data: string) => {
                data = data && data.trim();
                if (!data) return;

                const j1 = data.indexOf("[JSON]");
                if (j1 === -1) return;

                const j2 = data.indexOf("[/JSON]");
                if (j2 === -1) return;

                handler(JSON.parse(data.slice(j1 + 6, j2)));
            });
        }
    };

    return proc;
}