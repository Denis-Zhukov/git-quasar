export const BACKEND_URL = 'http://localhost:3000';

export const URLS = {
    login: `${BACKEND_URL}/auth/login`,
    register: `${BACKEND_URL}/auth/register`,
    refresh: `${BACKEND_URL}/auth/refresh`,
    logout: `${BACKEND_URL}/auth/logout`,
    createRepository: `${BACKEND_URL}/repository/create`,
    generateGetInfoRepository: (
        username: string,
        repository: string,
        branch: string,
    ) =>
        `${BACKEND_URL}/repository/info/${username}/${repository}?branch=${branch}`,
    generateGetFileRepository: (
        username: string,
        repository: string,
        filepath: string,
        branch: string,
    ) =>
        `${BACKEND_URL}/repository/file/${username}/${repository}?filepath=${filepath}&branch=${branch}`,
    generateGetRepositories: (username: string) =>
        `${BACKEND_URL}/repository/name/${username}`,
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
    generateCreateIssue: (username: string, repository: string) =>
        `${BACKEND_URL}/issues/create/${username}/${repository}`,
    generateGetIssues: (username: string, repository: string) =>
        `${BACKEND_URL}/issues/${username}/${repository}`,
    generateGetIssue: (issue: string) => `${BACKEND_URL}/issues/${issue}`,
    messageIssue: `${BACKEND_URL}/issues/message`,
} as const;
