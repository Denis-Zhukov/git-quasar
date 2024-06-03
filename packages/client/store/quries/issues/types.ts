export interface CreateIssueData {
    title: string;
    question: string;
    repository: string;
    usernameOwner: string;
}

export interface GetIssuesData {
    username: string;
    repository: string;
}

export type GetIssuesResponse = {
    closed: boolean;
    createdAt: string;
    id: string;
    qustion: string;
    repositoryId: string;
    title: string;
}[];

export interface GetIssueData {
    issue: string;
}

export interface GetIssueResponse {
    closed: boolean;
    createdAt: string;
    id: string;
    qustion: string;
    repositoryId: string;
    title: string;
    IssueMessage: {
        id: string;
        issueId: string;
        text: string;
        dislikes: number;
        likes: number;
        userId: string;
        updatedAt: string;
        createdAt: string;
    }[];
}

export interface MessageData {
    message: string;
    issueId: string;
}
