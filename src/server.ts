import FalconFrame from "@wxn0brp/falcon-frame";
import { createServer } from "http";
import { homedir } from "os";
import { join } from "path";
import { apiRouter, apiSecret } from "./api";
import { readLastPort, saveLastPort } from "./lastPort";
import { openWindow } from "./openWindow";
import { loadJson } from "./json";
import { showNotification } from "./notif";
import { spawn } from "child_process";

if (!process.env.ZHIVA_ROOT) process.env.ZHIVA_ROOT = join(homedir(), ".zhiva");
const envPort = process.env.ZHIVA_PORT;

let initialPort = 0;
const lastPort = readLastPort();
const zhivaJson = loadJson("zhiva.json");

if (envPort !== undefined) initialPort = Number(envPort);
if (zhivaJson?.forcePort !== undefined) initialPort = zhivaJson.forcePort;
else if (lastPort !== null) initialPort = lastPort;
else initialPort = 0;

export interface FalconFrameVars { }

export const app = new FalconFrame<FalconFrameVars>();
export const server = createServer(app.getApp());
app.static("/zhiva-assets", join(import.meta.dirname, "..", "assets"));
app.use("/zhiva-api", apiRouter);

let waitToStartResolve: ((port: number) => void);
let started = false;
export let port = 0;

export async function waitToStart() {
    if (started) return port;
    return await new Promise<number>((resolve) => {
        waitToStartResolve = resolve;
    });
}

function listen(_port: number) {
    server.listen(_port, "127.0.0.1", () => {
        port = (server.address() as any).port;
        console.log(`[Z-BIB-0-01] Server started on http://localhost:${port}`);
        saveLastPort(port);
        started = true;
        waitToStartResolve?.(port);
    });
}

server.once("error", (err: any) => {
    if (err.code === "EADDRINUSE" && initialPort !== 0) {
        console.log("[Z-BIB-0-02] Error start via default port. Use 0");
        listen(0);
    } else {
        throw err;
    }
});

export async function oneWindow(path = "/", title?: string) {
    await waitToStart();

    const rawUrl = `http://localhost:` + port + path;
    const urlObj = new URL(rawUrl);
    urlObj.searchParams.set("secret", apiSecret);
    const url = urlObj.toString();

    const time = Date.now();
    const window = openWindow(url, title);

    window.on("exit", (code) => {
        if (code === 0) process.exit(0);
        showNotification("Critical error on Zhiva", `Window can't be opened.`);

        // If window error (crash)
        if (time + 3000 < Date.now())
            process.exit(1);

        // If binary error, e.g. missing dll/so
        showNotification("Zhiva error", `Opening window failed. Using default browser. Some features may not work.`);
        let cmd = "";
        switch (process.platform) {
            case "win32":
                cmd = 'start ""';
                break;
            case "darwin":
                cmd = "open";
                break;
            case "linux":
                cmd = "xdg-open";
                break;
            default:
                console.error("[Z-BIB-0-03] 💔 Unknown platform");
                process.exit(1);
        }

        spawn(`${cmd} "${url}"`, { stdio: "inherit", shell: true });
    });
}

listen(initialPort);
