import { URLS } from '@/constants/urls';
import {
    CreateIssueData,
    GetIssueData,
    GetIssueResponse,
    GetIssuesData,
    GetIssuesResponse,
    MessageData,
} from '@/store/quries/issues/types';

import { api } from '../api';

const issuesApi = api.injectEndpoints({
    endpoints: (build) => ({
        createIssue: build.mutation<{ id: string }, CreateIssueData>({
            query: ({ repository, usernameOwner, question, title }) => ({
                body: { title, question },
                url: URLS.generateCreateIssue(usernameOwner, repository),
                method: 'POST',
            }),
        }),
        getIssues: build.query<GetIssuesResponse, GetIssuesData>({
            query: ({ repository, username }) => ({
                url: URLS.generateGetIssues(username, repository),
            }),
        }),
        getIssue: build.query<GetIssueResponse, GetIssueData>({
            providesTags: ['messages'],
            query: ({ issue }) => ({
                url: URLS.generateGetIssue(issue),
            }),
        }),
        message: build.mutation<unknown, MessageData>({
            invalidatesTags: ['messages'],
            query: (body) => ({
                body,
                url: URLS.messageIssue,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useCreateIssueMutation,
    useGetIssuesQuery,
    useGetIssueQuery,
    useMessageMutation,
} = issuesApi;
