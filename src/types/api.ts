export interface ZhivaApiOptions extends RequestInit {
	headers?: Record<string, string>;
}

export type ZhivaApiQuery = Record<string, string | number | boolean>;
