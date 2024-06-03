export const BACKEND_URL = 'http://localhost:3000';

export const URLS = {
    login: `${BACKEND_URL}/auth/login`,
    register: `${BACKEND_URL}/auth/register`,
    refresh: `${BACKEND_URL}/auth/refresh`,
    logout: `${BACKEND_URL}/auth/logout`,
    createRepository: `${BACKEND_URL}/repository/create`,
    generateGetInfoRepository: (username: string, repository: string) =>
        `${BACKEND_URL}/repository/info/${username}/${repository}`,
    generateGetFileRepository: (
        username: string,
        repository: string,
        filepath: string,
    ) =>
        `${BACKEND_URL}/repository/file/${username}/${repository}?filepath=${filepath}`,
    getAccountByName: (username: string) =>
        `${BACKEND_URL}/account/name/${username}`,
    getRepositoriesByName: (username: string) =>
        `${BACKEND_URL}/repository/name/${username}`,
    getAvatarUrl: (img: string) => `${BACKEND_URL}/account/avatars/${img}`,
    getRepoUrl: (username: string, repository: string) =>
        `${BACKEND_URL}/git/${username}/${repository}`,
    getDownloadRepoUrl: (username: string, repository: string) =>
        `${BACKEND_URL}/repository/download/${username}/${repository}`,
    generateUpdateProfile: (username: string) =>
        `${BACKEND_URL}/profile/update/${username}`,
} as const;
