export interface CreateRepositoryData {
    repoName: string;
    privateRepo: boolean;
}

export interface GetRepositoryData {
    username: string;
    repository: string;
}

export interface GetRepositoryResponse {
    files: string[];
    branches: string[];
}

export interface GetFileData {
    username: string;
    repository: string;
    filepath: string;
}
