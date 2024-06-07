export interface CreatePullRequestData {
    source: string;
    destination: string;
    username: string;
    repository: string;
    title: string;
    content: string;
}

export interface GetPullRequestData {
    id: string;
}

export interface MergeData {
    pullRequestId: string;
}

export interface GetPSResponse {
    content: string;
    createdAt: string;
    creatorId: string;
    destination: string;
    id: string;
    merged: boolean;
    repositoryId: string;
    source: string;
    title: string;
}
