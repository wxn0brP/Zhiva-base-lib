import { spawn } from "child_process";
import { homedir } from "os";
import { join, resolve } from "path";

export interface OpenWindowOptions {
	appId: string;
	backend: string | number;
	path: string;
}

let zhiva: string;

if (process.env.ZHIVA_ENGINE) zhiva = process.env.ZHIVA_ENGINE;
else if (process.env.ZHIVA_ROOT) zhiva = join(process.env.ZHIVA_ROOT, "zhiva");
else zhiva = join(homedir(), ".zhiva", "zhiva");

if (process.platform === "win32" && !zhiva.toLowerCase().endsWith(".exe"))
	zhiva += ".exe";

export function openWindow(
	url: string | number,
	title?: string,
): ReturnType<typeof spawn>;
export function openWindow(
	options: OpenWindowOptions,
	title?: string,
): ReturnType<typeof spawn>;
export function openWindow(
	input: string | number | OpenWindowOptions,
	title?: string,
) {
	const args: string[] = [];

	if (typeof input === "object") {
		args.push("--app-id", input.appId, "--backend", input.backend.toString());
		if (input.path) args.push("--path", input.path);
	} else args.push(input.toString());

	if (title) args.push(title);

	console.log(
		"[Z-BIB-4-01] Launching window:",
		typeof input === "object" ? input.appId : "url",
	);

	const proc = spawn(resolve(zhiva), args, {
		stdio: "inherit",
	});

	return proc;
}
