import FalconFrame from "@wxn0brp/falcon-frame";
import { createServer } from "http";
import { homedir } from "os";
import { join } from "path";
import { apiRouter, apiSecret } from "./api";
import { readLastPort, saveLastPort } from "./lastPort";
import { openWindow } from "./openWindow";

if (!process.env.ZHIVA_ROOT) process.env.ZHIVA_ROOT = join(homedir(), ".zhiva");
const envPort = process.env.ZHIVA_PORT;
const initialPort = envPort !== undefined ? Number(envPort) : readLastPort() ?? 0;

export const app = new FalconFrame();
export const server = createServer(app.getApp());
app.static("/zhiva-assets", join(import.meta.dirname, "..", "assets"));
app.use("/api", apiRouter);

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
    const url = new URL(rawUrl);
    url.searchParams.set("secret", apiSecret);

    const window = openWindow(url.toString(), title);
    window.on("close", () => process.exit(0));
    return window;
}

listen(initialPort);