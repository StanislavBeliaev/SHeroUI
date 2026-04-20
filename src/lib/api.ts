import { ApiClient } from '@/lib/core/ApiClient';

export const api = new ApiClient({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://salonpro.online/api/v1',

    tokenCookieName: process.env.AUTH_COOKIE_NAME || 'access_token',

    cookieHeaders: {
        [process.env.COUNTRY_COOKIE_NAME || 'country_id']: 'X-Country-Id',
        [process.env.CITY_COOKIE_NAME || 'city_id']: 'X-City-Id',
    },

    defaultTimeout: 100_000,
    enableLogging: process.env.NODE_ENV === 'development',
});