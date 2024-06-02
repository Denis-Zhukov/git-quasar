import { URLS } from '@/constants/urls';

import { api } from '../api';
import {
    CreateRepositoryData,
    GetFileData,
    GetRepositoryData,
    GetRepositoryResponse,
} from './types';

const repositoriesApi = api.injectEndpoints({
    endpoints: (build) => ({
        create: build.mutation<unknown, CreateRepositoryData>({
            query: (body) => ({
                body,
                url: URLS.createRepository,
                method: 'POST',
            }),
        }),
        getInfo: build.query<GetRepositoryResponse, GetRepositoryData>({
            query: ({ username, repository }) => ({
                url: URLS.generateGetInfoRepository(username, repository),
                method: 'GET',
            }),
        }),
        getFile: build.query<unknown, GetFileData>({
            query: ({ username, repository, filepath }) => ({
                url: URLS.generateGetFileRepository(
                    username,
                    repository,
                    filepath,
                ),
                method: 'GET',
            }),
        }),
    }),
});

export const { useCreateMutation, useGetInfoQuery, useLazyGetFileQuery } =
    repositoriesApi;
