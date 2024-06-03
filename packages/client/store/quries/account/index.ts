import { URLS } from '@/constants/urls';

import { api } from '../api';
import { ToggleBlockData } from './types';

const accountApi = api.injectEndpoints({
    endpoints: (build) => ({
        toggleBlock: build.mutation<unknown, ToggleBlockData>({
            query: ({ username, status }) => ({
                body: { blocked: status },
                url: URLS.generateToggleBlock(username),
                method: 'PATCH',
            }),
        }),
        toggleDeactivate: build.mutation<unknown, ToggleBlockData>({
            query: ({ username, status }) => ({
                body: { deactivated: status },
                url: URLS.generateToggleDeactivated(username),
                method: 'PATCH',
            }),
        }),
    }),
});

export const { useToggleBlockMutation, useToggleDeactivateMutation } =
    accountApi;
