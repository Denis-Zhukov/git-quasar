import { URLS } from '@/constants/urls';

import { api } from '../api';
import { CreateRepositoryData } from './types';

const repositoriesApi = api.injectEndpoints({
    endpoints: (build) => ({
        create: build.mutation<unknown, CreateRepositoryData>({
            query: (body) => ({
                body,
                url: URLS.createRepository,
                method: 'POST',
            }),
        }),
    }),
});

export const { useCreateMutation } = repositoriesApi;
