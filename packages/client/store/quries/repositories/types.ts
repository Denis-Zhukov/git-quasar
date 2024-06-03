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
    mainBranch: string;
}

export interface GetFileData {
    username: string;
    repository: string;
    filepath: string;
}

export interface GetFileResponse {
    file: string
}
