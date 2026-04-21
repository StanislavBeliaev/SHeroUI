// lib/core/ApiClient.ts
export interface ApiClientConfig {
    baseURL: string;
    tokenCookieName?: string;
    /** Маппинг: имя куки → имя заголовка. Значения куки передадутся в заголовок как есть */
    cookieHeaders?: Record<string, string>;
    defaultHeaders?: Record<string, string>;
    defaultTimeout?: number;
    enableLogging?: boolean;
    getToken?: () => Promise<string | null> | string | null;
}
interface ResolvedConfig {
    baseURL: string;
    tokenCookieName: string;
    cookieHeaders: Record<string, string>;
    defaultHeaders: Record<string, string>;
    defaultTimeout: number;
    enableLogging: boolean;
    getToken?: () => Promise<string | null> | string | null;
}

export interface FetchOptions extends Omit<RequestInit, 'body'> {
    params?: Record<string, string | number | boolean | string[] | number[] | undefined | null>;
    body?: unknown;
    revalidate?: number | false;
    tags?: string[];
    timeout?: number;
}

export class ApiError extends Error {
    public status: number;
    public data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

type NextCacheOptions = { revalidate?: number | false; tags?: string[] };

export class ApiClient {
    private config: ResolvedConfig;

    constructor(config: ApiClientConfig) {
        this.config = {
            baseURL: config.baseURL,
            tokenCookieName: config.tokenCookieName ?? 'access_token',
            cookieHeaders: config.cookieHeaders ?? {},
            defaultHeaders: { Accept: 'application/json', ...config.defaultHeaders },
            defaultTimeout: config.defaultTimeout ?? 100_000,
            enableLogging: config.enableLogging ?? process.env.NODE_ENV === 'development',
            getToken: config.getToken,
        };
    }

    private readCookieValue(
        cookieStore: { get: (name: string) => { value: string } | undefined; getAll: () => Array<{ name: string; value: string }> },
        cookieName: string,
    ): string | undefined {
        const direct = cookieStore.get(cookieName)?.value;
        if (direct !== undefined) return direct;
        const normalized = cookieName.toLowerCase();
        const fallback = cookieStore.getAll().find((item) => item.name.toLowerCase() === normalized);
        return fallback?.value;
    }

    private async injectServerHeaders(headers: Headers): Promise<void> {
        if (typeof window !== 'undefined') return;

        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            const allCookies = cookieStore.getAll();

            if (!headers.has('Cookie') && allCookies.length > 0) {
                const cookieHeader = allCookies
                    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
                    .join('; ');
                headers.set('Cookie', cookieHeader);
            }

            if (!headers.has('Authorization')) {
                const token = this.config.getToken
                    ? await Promise.resolve(this.config.getToken())
                    : this.readCookieValue(cookieStore, this.config.tokenCookieName);

                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
            }

            if (this.config.cookieHeaders) {
                for (const [cookieName, headerName] of Object.entries(this.config.cookieHeaders)) {
                    const value = this.readCookieValue(cookieStore, cookieName);
                    if (value !== undefined) {
                        headers.set(headerName, value);
                    }
                }
            }
        } catch {
            // Вне HTTP-контекста (cron, скрипты, edge без запроса)
        }
    }

    private buildUrl(endpoint: string, params?: FetchOptions['params']): string {
        const base = this.config.baseURL.replace(/\/$/, '');
        const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = new URL(`${base}${path}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value === undefined || value === null) return;
                if (Array.isArray(value)) {
                    // biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
                    value.forEach((v) => url.searchParams.append(key, String(v)));
                } else {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        return url.toString();
    }

    private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<{ data: T }> {
        const { revalidate, tags, timeout = this.config.defaultTimeout, params, ...restOptions } = options;
        const fullUrl = this.buildUrl(endpoint, params);
        const start = this.config.enableLogging ? Date.now() : 0;

        const isFormData = options.body instanceof FormData;
        const headers = new Headers({ ...this.config.defaultHeaders, ...restOptions.headers });

        if (!isFormData && restOptions.body) {
            headers.set('Content-Type', 'application/json');
        }

        // Инъекция серверных куков в заголовки
        await this.injectServerHeaders(headers);
        if (this.config.enableLogging) {
            console.log('[ApiClient] Финальные заголовки запроса:', Object.fromEntries(headers.entries()));
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const fetchConfig: RequestInit & { next?: NextCacheOptions } = {
            ...restOptions,
            headers,
            credentials: 'include',
            signal: controller.signal,
            body: isFormData
                ? (options.body as BodyInit)
                : options.body !== undefined
                    ? JSON.stringify(options.body)
                    : undefined,
        };
        console.log('fetchConfig', fetchConfig)
        if (typeof window === 'undefined' && (revalidate !== undefined || tags !== undefined)) {
            fetchConfig.next = { revalidate, tags };
        }

        try {
            const response = await fetch(fullUrl, fetchConfig);

            if (this.config.enableLogging) {
                console.log(`[api] ${endpoint} ${Date.now() - start}ms`);
            }

            let data: unknown;
            try {
                data = await response.json();
            } catch {
                data = await response.text();
            }

            if (!response.ok) {
                const message = (data as any)?.message ?? `HTTP ${response.status}: ${response.statusText}`;
                throw new ApiError(message, response.status, data);
            }

            return { data: data as T };
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Request timed out', 408);
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async get<T>(endpoint: string, options?: FetchOptions) {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, body?: unknown, options?: FetchOptions) {
        return this.request<T>(endpoint, { ...options, method: 'POST', body });
    }

    async put<T>(endpoint: string, body?: unknown, options?: FetchOptions) {
        return this.request<T>(endpoint, { ...options, method: 'PUT', body });
    }

    async patch<T>(endpoint: string, body?: unknown, options?: FetchOptions) {
        return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
    }

    async delete<T>(endpoint: string, options?: FetchOptions) {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}