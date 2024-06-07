export interface CreatePullRequestData {
    source: string;
    destination: string;
    username: string;
    repository: string;
}

export interface GetPullRequestData {
    id: string;
}

export interface MergeData {
    pullRequestId: string;
}
