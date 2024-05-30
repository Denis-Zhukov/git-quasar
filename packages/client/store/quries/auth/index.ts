import { URLS } from '@/constants/urls';

import { api } from '../api';
import { RegisterData } from './types';

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<unknown, RegisterData>({
            query: (account) => ({
                body: account,
                url: URLS.register,
                method: 'POST',
            }),
        }),
    }),
});

export const { useRegisterMutation } = authApi;
