export interface CreateRepositoryData {
    repoName: string;
    privateRepo: boolean;
}

export interface GetRepositoryData {
    username: string;
    repository: string;
    branch: string;
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
    branch: string;
}

export interface GetFileResponse {
    file: string;
}

export type GetRepositoriesResponse = {
    createdAt: string;
    id: string;
    main_branch: string;
    name: string;
    private: boolean;
    userId: string;
}[];
