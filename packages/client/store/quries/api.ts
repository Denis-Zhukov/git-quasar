import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { getAccessToken } from '@/utils/local-storage-utils';

const customBaseQuery: BaseQueryFn = async (
    args,
    api: BaseQueryApi,
    extraOptions,
) => {
    const query = fetchBaseQuery({
        baseUrl: '',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getAccessToken()}`);
            return headers;
        },
    });

    let result = await query(args, api, extraOptions);

    if (result.error?.status === 401) {
        await api.dispatch(refreshAuthThunk);
        result = await query(args, api, extraOptions);
    }

    return result;
};

export const api = createApi({
    tagTypes: [],
    reducerPath: 'api',
    baseQuery: customBaseQuery,
    endpoints: () => ({}),
});
