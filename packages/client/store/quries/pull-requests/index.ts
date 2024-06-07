import { URLS } from '@/constants/urls';
import { GetIssuesData, GetIssuesResponse } from '@/store/quries/issues/types';

import { api } from '../api';
import {
    CreatePullRequestData,
    GetPSResponse,
    GetPullRequestData,
} from './types';

const pullRequestsApi = api.injectEndpoints({
    endpoints: (build) => ({
        createPullRequest: build.mutation<unknown, CreatePullRequestData>({
            query: (body) => ({
                body,
                url: URLS.createPullRequest,
                method: 'POST',
            }),
        }),
        getPullRequest: build.query<GetPSResponse, GetPullRequestData>({
            query: ({ id }) => ({
                url: URLS.generateGetPullRequest(id),
            }),
        }),
        merge: build.mutation<unknown, GetPullRequestData>({
            query: ({ id }) => ({
                body: { pullRequestId: id },
                url: URLS.merge,
                method: 'POST',
            }),
        }),
        getPullRequests: build.query<GetPSResponse[], GetIssuesData>({
            query: ({ repository, username }) => ({
                url: URLS.generateGetPRs(username, repository),
            }),
        }),
    }),
});

export const {
    useCreatePullRequestMutation,
    useGetPullRequestQuery,
    useMergeMutation,
    useGetPullRequestsQuery,
} = pullRequestsApi;
