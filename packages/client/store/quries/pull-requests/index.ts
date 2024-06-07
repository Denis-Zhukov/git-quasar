import { URLS } from '@/constants/urls';

import { api } from '../api';
import { CreatePullRequestData, GetPullRequestData } from './types';

const pullRequestsApi = api.injectEndpoints({
    endpoints: (build) => ({
        createPullRequest: build.mutation<unknown, CreatePullRequestData>({
            query: (body) => ({
                body,
                url: URLS.createPullRequest,
                method: 'POST',
            }),
        }),
        getPullRequest: build.query<unknown, GetPullRequestData>({
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
    }),
});

export const {
    useCreatePullRequestMutation,
    useGetPullRequestQuery,
    useMergeMutation,
} = pullRequestsApi;
