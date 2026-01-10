import { ZhivaApiOptions, ZhivaApiQuery } from "../types/api";

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("secret");

export function fetchApi(url: string, opts: ZhivaApiOptions = {}, query: ZhivaApiQuery = {}) {
    if (!url.startsWith("/")) url = "/" + url;
    const urlObj = new URL("/api" + url, window.location.origin);

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

export async function fetchApiPost(url: string, body: Record<string, any> = {}, opts: ZhivaApiOptions = {}, query: ZhivaApiQuery = {}) {
    return await fetchApi(url, {
        method: "POST",
        ...opts,
        body: JSON.stringify(body),
        headers: {
            ...opts.headers,
            "Content-Type": "application/json"
        }
    }, query).then(res => res.json());
}

export async function fetchApiJson(url: string, opts: ZhivaApiOptions = {}, query: ZhivaApiQuery = {}) {
    return await fetchApi(url, opts, query).then(res => res.json());
}