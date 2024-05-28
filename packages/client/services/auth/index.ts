import { URLS } from '@/constants/urls';

import type { Payload, ResponseData } from './types';

export const authService = {
    login: async (data: Payload) => {
        const response = await fetch(URLS.login, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            method: 'POST',
            credentials: 'include',
        });
        return (await response.json()) as Promise<ResponseData>;
    },
};
