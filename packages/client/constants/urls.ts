export const BACKEND_URL = 'http://localhost:3000';

export const URLS = {
    login: `${BACKEND_URL}/auth/login`,
    register: `${BACKEND_URL}/auth/register`,
    refresh: `${BACKEND_URL}/auth/refresh`,
    logout: `${BACKEND_URL}/auth/logout`,
    createRepository: `${BACKEND_URL}/repository/create`,
    getAccountByName: (username: string) =>
        `${BACKEND_URL}/account/name/${username}`,
    getRepositoriesByName: (username: string) =>
        `${BACKEND_URL}/repository/name/${username}`,
    getAvatarUrl: (img: string) => `${BACKEND_URL}/account/avatars/${img}`,
} as const;
