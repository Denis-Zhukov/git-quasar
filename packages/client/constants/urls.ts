const BACKEND_URL = 'http://localhost:3000';

export const URLS = {
    login: `${BACKEND_URL}/auth/login`,
    register: `${BACKEND_URL}/auth/register`,
} as const;
