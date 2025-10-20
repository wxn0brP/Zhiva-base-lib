import FalconFrame from "@wxn0brp/falcon-frame";
import { createServer } from "http";
import { openWindow } from "./openWindow";

export const app = new FalconFrame();
export const server = createServer(app.getApp());

let waitToStartResolve: ((port: number) => void);
let started = false;
export let port = 0;

export async function waitToStart() {
    if (started) return port;
    return await new Promise<number>((resolve) => {
        waitToStartResolve = resolve;
    });
}

server.listen(0, () => {
    port = (server.address() as any).port;
    waitToStartResolve?.(port);
    started = true;
});

export async function oneWindow(path = "/", title?: string) {
    await waitToStart();
    const window = openWindow(port + path, title);
    window.on("close", () => process.exit(0));
    return window;
}