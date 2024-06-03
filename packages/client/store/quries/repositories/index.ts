import { URLS } from '@/constants/urls';

import { api } from '../api';
import {
    CreateRepositoryData,
    GetFileData,
    GetFileResponse,
    GetRepositoriesResponse,
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
            query: ({ username, repository, branch }) => ({
                url: URLS.generateGetInfoRepository(
                    username,
                    repository,
                    branch,
                ),
                method: 'GET',
            }),
        }),
        getFile: build.query<GetFileResponse, GetFileData>({
            query: ({ username, repository, filepath, branch }) => ({
                url: URLS.generateGetFileRepository(
                    username,
                    repository,
                    filepath,
                    branch,
                ),
                method: 'GET',
            }),
        }),
        getRepositories: build.query<
            GetRepositoriesResponse,
            { username: string }
        >({
            query: ({ username }) => ({
                url: URLS.generateGetRepositories(username),
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateMutation,
    useGetInfoQuery,
    useLazyGetFileQuery,
    useGetRepositoriesQuery,
} = repositoriesApi;
