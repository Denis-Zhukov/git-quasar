export interface CreateRepositoryData {
    repoName: string;
    privateRepo: boolean;
}

export interface GetRepositoryData {
    username: string;
    repository: string;
    branch: string;
    currentUser: string;
}

export interface GetRepositoryResponse {
    files: string[];
    branches: string[];
    mainBranch: string;
    favorite: boolean;
    owner: boolean;
    isEmpty: boolean;
}

export interface GetFileData {
    username: string;
    repository: string;
    filepath: string;
    branch: string;
    blame: boolean;
}

export interface GetFileResponse {
    file: string;
    path: string;
}

export type GetRepositoriesResponse = {
    createdAt: string;
    id: string;
    main_branch: string;
    name: string;
    private: boolean;
    userId: string;
}[];

export interface FavoriteRepository {
    username: string;
    repository: string;
}

export interface AddCollaboratorData {
    username: string;
    repository: string;
    collaborator: string;
}

export interface GetCollaboratorsData {
    username: string;
    repository: string;
}

export type GetCollaboratorsResponse = {
    id: string;
    username: string;
    email: string;
}[];

export interface RemoveCollaboratorData {
    collaboratorId: string;
    username: string;
    repository: string;
}

export interface DeleteRepositoryData {
    username: string;
    repository: string;
}
