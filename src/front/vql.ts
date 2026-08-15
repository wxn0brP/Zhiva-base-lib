import { VConfig } from "@wxn0brp/vql-client";
import { zhivaApiToken } from "./api";

export function initVQL(endpoint = "VQL") {
	VConfig.url = `/zhiva-api/${endpoint}`;
	VConfig.headers ||= {};
	VConfig.headers["x-zhiva-token"] = zhivaApiToken;
}
