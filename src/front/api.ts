import { ZhivaApiOptions, ZhivaApiQuery } from "../types/api";

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("secret");

export function fetchApi(url: string, opts: ZhivaApiOptions = {}, query: ZhivaApiQuery = {}) {
    const urlObj = new URL("/api/" + url, window.location.origin);

    Object.entries(query).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value.toString());
    });

    return fetch(urlObj.toString(), {
        ...opts,
        headers: {
            ...opts.headers,
            "x-zhiva-token": token
        }
    });
};