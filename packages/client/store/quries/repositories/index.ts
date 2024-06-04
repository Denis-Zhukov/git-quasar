import { URLS } from '@/constants/urls';

import { api } from '../api';
import {
    AddCollaboratorData,
    CreateRepositoryData,
    FavoriteRepository,
    GetCollaboratorsData,
    GetCollaboratorsResponse,
    GetFileData,
    GetFileResponse,
    GetRepositoriesResponse,
    GetRepositoryData,
    GetRepositoryResponse,
    RemoveCollaboratorData,
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
            providesTags: ['favorite'],
            query: ({ username, repository, branch, currentUser }) => ({
                url: URLS.generateGetInfoRepository(
                    username,
                    repository,
                    branch,
                    currentUser,
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
        favoriteRepository: build.mutation<unknown, FavoriteRepository>({
            query: (body) => ({
                url: URLS.favoriteRepository,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['favorite'],
        }),
        addCollaborator: build.mutation<unknown, AddCollaboratorData>({
            query: (body) => ({
                url: URLS.addCollaborator,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['collaborators'],
        }),
        getCollaborators: build.query<
            GetCollaboratorsResponse,
            GetCollaboratorsData
        >({
            query: ({ username, repository }) => ({
                url: URLS.generateGetCollaborators(username, repository),
            }),
            providesTags: ['collaborators'],
        }),
        removeCollaborator: build.mutation<unknown, RemoveCollaboratorData>({
            query: (body) => ({
                url: URLS.addCollaborator,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ['collaborators'],
        }),
    }),
});

export const {
    useCreateMutation,
    useGetInfoQuery,
    useLazyGetFileQuery,
    useGetRepositoriesQuery,
    useFavoriteRepositoryMutation,
    useAddCollaboratorMutation,
    useGetCollaboratorsQuery,
    useRemoveCollaboratorMutation,
} = repositoriesApi;
