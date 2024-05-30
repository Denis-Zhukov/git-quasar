import axios from 'axios';

import { URLS } from '@/constants/urls';

import type { Payload, ResponseData } from './types';

export const authService = {
    login: async (data: Payload) => {
        const response = await axios.post<ResponseData>(URLS.login, data, {
            withCredentials: true,
        });
        return response.data;
    },
    refresh: async () => {
        const response = await axios.post<ResponseData>(
            URLS.refresh,
            {},
            {
                withCredentials: true,
            },
        );
        return response.data;
    },
};
