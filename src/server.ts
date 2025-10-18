import FalconFrame from "@wxn0brp/falcon-frame";
import { GlovesLinkServer } from "@wxn0brp/gloves-link-server";
import { AuthFn, Server_Auth_Opts } from "@wxn0brp/gloves-link-server/types";
import { createServer } from "http";
import { resolve } from "path";

export const app = new FalconFrame();
export const server = createServer(app.getApp());

let authFn: AuthFn = () => true;
export function setAuthFn(fn: AuthFn) {
    authFn = fn;
}

export const wws = new GlovesLinkServer({
    server,
    authFn: (data: Server_Auth_Opts) => authFn(data)
});

const clientDir = process.env.ZHIVA_GLOVES_LINK_CLIENT_DIR || resolve(import.meta.dirname + "/../node_modules/@wxn0brp/gloves-link-client/dist");
wws.falconFrame(app, clientDir);

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