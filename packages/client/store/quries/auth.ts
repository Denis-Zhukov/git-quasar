import { api } from './api';

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (account: any) => ({
                body: account,
                url: '/sign-up',
                method: 'POST',
            }),
        }),
    }),
});

export const { useRegisterMutation } = authApi;
